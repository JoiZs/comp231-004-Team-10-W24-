import { Router } from "express";
import prisma from "../../utils/prismaClient";
import { excludeEntry } from "../../utils/excludefieldprisma";
import { isDate } from "validator";
import { deleteImg, resizeImg, uploadImg } from "../../utils/imgupload";
import { isAuthenticated } from "../../utils/loginverify";
import { getDistance } from "geolib";

const profileRouter = Router();

profileRouter.get("/me", isAuthenticated, async (req, res) => {
  const user = req.user;

  if (!user) return res.json({ type: "error", message: "Unauthorized user." });

  const findUser = await prisma.client.findFirst({
    where: { userId: user.userid },
    include: {
      Profile: true,
      address: true,
      reviewReceived: user.userType == "Sitter" && true,
      followedBy: user.userType == "Sitter" && {
        select: { userId: true, firstname: true, lastname: true },
      },
      following: user.userType == "Owner" && {
        select: { userId: true, firstname: true, lastname: true },
      },
    },
  });

  return res.json(excludeEntry(findUser, ["password"]));
});

profileRouter.post("/sitters", async (req, res) => {
  const userid = req.user?.userid;

  const { pageNum = 1, sortByRating = 4, sortByLocation = false } = req.body;

  if (!sortByLocation) {
    await prisma.review
      .groupBy({
        by: ["receiverId"],
        skip: (pageNum - 1) * 5,
        _avg: { rating: true },
        take: 5,
        having: {
          rating: {
            _avg: {
              gte: sortByRating,
            },
          },
        },
        orderBy: { receiverId: "desc" },
      })
      .then(async (result) => {
        const restCount = await prisma.review.count({
          skip: pageNum * 5,
          where: { rating: { gte: sortByRating } },
          orderBy: { rating: "desc" },
        });

        const currentUserLoc = userid
          ? await prisma.address.findFirst({
              where: { userUserId: userid },
              select: { latitude: true, longitude: true },
            })
          : undefined;

        const sitterPromises = result.map(async (el) => {
          const sitterData = await prisma.client.findFirst({
            select: {
              userId: true,
              firstname: true,
              lastname: true,
              address: { select: { latitude: true, longitude: true } },
              Profile: {
                select: {
                  img: true,
                  availabilitySlot: true,
                  petType: true,
                },
              },
            },
            where: { userId: el.receiverId },
          });

          if (!currentUserLoc || !sitterData?.address) {
            return sitterData;
          } else {
            const distance =
              getDistance(
                {
                  latitude: currentUserLoc.latitude,
                  longitude: currentUserLoc.longitude,
                },
                {
                  latitude: sitterData?.address?.latitude,
                  longitude: sitterData?.address?.longitude,
                }
              ) / 1000;
            return { ...sitterData, distance };
          }
        });

        const finalResults = await Promise.all(sitterPromises);

        return res.json({
          type: "success",
          message: `Found ${result.length} sitters`,
          data: {
            remaining: restCount,
            sitters: finalResults,
          },
        });
      });
  }
});

profileRouter.get("/:stid", async (req, res) => {
  const { stid } = req.params;
  const findUser = await prisma.client.findFirst({
    where: {
      userId: stid,
    },
    include: {
      address: true,
      followedBy: {
        select: { firstname: true, lastname: true },
      },
      reviewReceived: true,
    },
  });

  if (!findUser) return res.json({ type: "error", message: "No user found." });

  return res.json(excludeEntry(findUser, ["password"]));
});

profileRouter.patch(
  "/changepic",
  isAuthenticated,
  uploadImg.single("profile"),
  async (req, res) => {
    if (!req.file)
      return res.json({
        type: "error",
        message: "An image required to upload.",
      });

    try {
      const resizedPath = await resizeImg(req.file);
      const checkImg = await prisma.media.findFirst({
        where: { Profile: { userUserId: req.user.userid } },
      });

      // eslint-disable-next-line no-extra-boolean-cast
      if (!!checkImg) {
        deleteImg(checkImg.img);
      }
      await prisma.profile.update({
        where: { userUserId: req.user.userid },
        data: {
          img: {
            upsert: {
              update: { img: resizedPath },
              create: { img: resizedPath },
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({ type: "error", message: "Error on uploading image." });
    }

    return res.json({
      type: "success",
      message: "Successfully uploaded a profile",
    });
  }
);

profileRouter.patch("/update", isAuthenticated, async (req, res) => {
  const { address, fname, lname, pType } = req.body;

  const userid = req.user.userid;

  try {
    await prisma.client.update({
      where: { userId: userid },
      data: {
        address: {
          update: { ...(address && { address: address }) },
        },
        ...(fname && { firstname: fname }),
        ...(lname && { lastname: lname }),
        Profile: { update: { ...(pType && { petType: pType }) } },
      },
    });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.json({ type: "error", message: "Updating is not allowed." });
    }
  }
  return res.json({ type: "success", message: "Successfully updated." });
});

profileRouter.patch("/changeava", isAuthenticated, async (req, res) => {
  const { avSlot, avStart, avEnd } = req.body;

  if (!avSlot || !avStart || !avEnd)
    return res.json({
      type: "error",
      message: "Available Spot, Start date, and End date required.",
    });

  if (isDate(avStart) || isDate(avEnd))
    return res.json({ type: "error", message: "Invalid date." });

  const userid = req.user.userid;

  try {
    await prisma.profile.update({
      where: { userUserId: userid },
      data: {
        availabilitySlot: avSlot,
        availabilityStart: new Date(avStart),
        availabilityEnd: new Date(avEnd),
      },
    });
  } catch (error) {
    if (error) {
      console.error(error);
      return res.json({
        type: "error",
        message: "Cannot change the availability.",
      });
    }
  }

  return res.json({ type: "success", message: "Changed the availability." });
});

profileRouter.patch("/sub", isAuthenticated, async (req, res) => {
  const user = req.user;
  const { sitterId } = req.body;

  if (user.userType !== "Owner") {
    return res.json({
      type: "error",
      message: "Only owner can follow sitters.",
    });
  }
  try {
    await prisma.client.update({
      where: { userId: user.userid },
      data: {
        following: { connect: { userId: sitterId } },
      },
    });
  } catch (error) {
    if (error)
      return res.json({ type: "error", message: "Error on following user." });
  }
  return res.json({ type: "success", message: "Followed a user." });
});

profileRouter.patch("/unsub", isAuthenticated, async (req, res) => {
  const user = req.user;
  const { sitterId } = req.body;

  if (user.userType !== "Owner") {
    return res.json({
      type: "error",
      message: "Sitters are not allowed to follow.",
    });
  }

  try {
    await prisma.client.update({
      where: { userId: user.userid },
      data: {
        following: { disconnect: { userId: sitterId } },
      },
    });
  } catch (error) {
    if (error)
      return res.json({ type: "error", message: "Error on following user." });
  }
  return res.json({ type: "success", message: "Unfollowed a user." });
});

export default profileRouter;
