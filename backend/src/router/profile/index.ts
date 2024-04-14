import { Router } from "express";
import prisma from "../../utils/prismaClient";
import { excludeEntry } from "../../utils/excludefieldprisma";
import { isDate } from "validator";
import { deleteImg, resizeImg, uploadImg } from "../../utils/imgupload";
import { isAuthenticated } from "../../utils/loginverify";
import { getDistance } from "geolib";
import _ from "lodash";

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

  return res.json({
    data: excludeEntry(findUser, ["password"]),
    type: "success",
    message: "Authenticated.",
  });
});

profileRouter.post("/sitters", async (req, res) => {
  const userid = req.user?.userid;

  const { pageNum = 1, sortByRating = 4, sortByLocation = false } = req.body;

  await prisma.client
    .findMany({
      skip: (pageNum - 1) * 5,
      take: 5,
      orderBy: { userId: "desc" },
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
        _count: {
          select: {
            reviewReceived: {
              // where: { rating: { gte: sortByRating } },
              where: {
                AND: [{ rating: { gte: sortByRating - 1 } }],
              },
            },
            sitterReservation: {
              where: { status: "On-Going" },
            },
          },
        },
      },
      where: {
        userId: { not: userid },
        Profile: { profileType: "Sitter" },
        reviewReceived: { every: { rating: { gte: sortByRating - 1 } } },
      },
    })
    .then(async (result: any) => {
      const restCount = await prisma.client.count({
        skip: pageNum * 5,
        orderBy: { userId: "desc" },
      });

      const currentUserLoc = userid
        ? await prisma.address.findFirst({
            where: { userUserId: userid },
            select: { latitude: true, longitude: true },
          })
        : undefined;

      const sitterPromises = result
        .filter((ft: any) =>
          sortByRating > 0 ? ft._count.reviewReceived > 0 : ft
        )
        .map(async (el: any) => {
          const sitterData = await prisma.review.aggregate({
            _avg: { rating: true },
            orderBy: { receiverId: "desc" },
            where: { receiverId: el.userId },
          });

          if (
            !currentUserLoc?.latitude ||
            !currentUserLoc.longitude ||
            !el.address?.latitude ||
            !el.address.longitude
          ) {
            return { rating: sitterData._avg.rating, ...el };
          } else {
            const distance =
              getDistance(
                {
                  latitude: currentUserLoc.latitude,
                  longitude: currentUserLoc.longitude,
                },
                {
                  latitude: el?.address?.latitude,
                  longitude: el?.address?.longitude,
                }
              ) / 1000;

            return { rating: sitterData._avg.rating, distance, ...el };
          }
        });

      const finalResults = await Promise.all(sitterPromises);

      return res.json({
        type: "success",
        message: `Found ${result.length} sitters`,
        data: {
          remaining: restCount,
          sitters: !sortByLocation
            ? finalResults
            : _.sortBy(finalResults, ["distance"]),
        },
      });
    });
});

profileRouter.get("/:stid", async (req, res) => {
  const { stid } = req.params;
  const findUser = await prisma.client.findFirst({
    where: {
      userId: stid,
    },
    include: {
      address: true,
      Profile: {
        select: {
          availabilitySlot: true,
          img: true,
          availabilityStart: true,
          availabilityEnd: true,
        },
      },
      followedBy: {
        select: { firstname: true, lastname: true },
      },
      _count: { select: { reviewReceived: true } },
      reviewReceived: {
        select: {
          comment: true,
          rating: true,
          createdAt: true,
          givenBy: { select: { firstname: true, lastname: true } },
        },
        take: 3,
        orderBy: { rating: "desc" },
      },
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
  const { address, fname, lname, pType, petSlot, avaDateEnd, avaDateStart } =
    req.body;

  const userid = req.user.userid;

  try {
    await prisma.client.update({
      where: { userId: userid },
      data: {
        address: {
          update: {
            ...(address && {
              city: address.city,
              street: address.street,
              postalCode: address.postalCode,
              province: address.province,
              suburb: address.suburb,
              latitude: address.lat,
              longitude: address.long,
            }),
          },
        },
        ...(fname && { firstname: fname }),
        ...(lname && { lastname: lname }),
        Profile: {
          update: {
            ...(pType && { petType: pType }),
            ...(petSlot && { availabilitySlot: petSlot }),
            ...(avaDateStart && { availabilityStart: new Date(avaDateStart) }),
            ...(avaDateEnd && { availabilityEnd: new Date(avaDateEnd) }),
          },
        },
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
    console.log(error);
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
