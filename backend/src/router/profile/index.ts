import { Router } from "express";
import { verifyTk } from "../../utils/authtoken";
import prisma from "../../utils/prismaClient";
import { excludeEntry } from "../../utils/excludefieldprisma";
import { Client } from "@prisma/client";
import { checkAuth } from "../../middleware/checkauth";
import { isDate } from "validator";
import { deleteImg, resizeImg, uploadImg } from "../../utils/imgupload";

const profileRouter = Router();

profileRouter.get("/me", async (req, res) => {
  const { __petSitTk } = req.cookies;

  const payload = await verifyTk(__petSitTk);
  if (!payload || typeof payload == "string")
    return res.json({ type: "error", message: "Invalid user. " });

  const findUser = await prisma.client.findFirst({
    where: { userId: payload.payload.userId },
    include: {
      Profile: true,
      address: true,
      reviewReceived: payload.payload.userType == "sitter" && true,
      followedBy: payload.payload.userType == "sitter" && true,
      following: payload.payload.userType == "owner" && true,
    },
  });

  return res.json(excludeEntry(findUser, ["password"]));
});

profileRouter.post("/sitters", async (req, res) => {
  const {
    pageNum = 1,
    sortByRating = 4,
    sortByLocation = false,
    positionCoords,
  } = req.body;

  //   const byReviews = await prisma.client.aggregate({
  //     where: {
  //       reviewReceived: { every: { rating: { gte: sortByRating } } },
  //     },
  //     take: 5,
  //     skip: (pageNum - 1) * 5,
  //   });

  //   if (sortByLocation) {
  //     // getDistance({ positionCoords });
  // }

  const byLocation = await prisma.$queryRaw<
    Client[]
  >`SELECT * FROM "Client" C LEFT JOIN "Review" R ON R."receiverId"=C."userId";`;
  console.log(byLocation);
  res.send("hey");
});

profileRouter.get("/:stid", (req, res) => {
  const { stid } = req.params;
  const findUser = prisma.client.findFirst({
    where: {
      userId: stid,
    },
    include: {
      address: true,
      followedBy: true,
      reviewReceived: true,
      reviewGivenBy: true,
    },
  });

  if (!findUser) return res.json({ type: "error", message: "No user found." });

  return res.json(excludeEntry(findUser, ["password"]));
});

profileRouter.patch(
  "/changepic",
  checkAuth,
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
        where: { Profile: { userUserId: req.context.uid } },
      });

      if (!!checkImg) {
        console.log(checkImg);
        deleteImg(checkImg.img);
      }
      await prisma.profile.update({
        where: { userUserId: req.context.uid },
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

profileRouter.patch("/update", checkAuth, async (req, res) => {
  const { address, fname, lname, pType } = req.body;

  const userid = req.context.uid;

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

profileRouter.patch("/changeava", checkAuth, async (req, res) => {
  const { avSlot, avStart, avEnd } = req.body;

  if (!avSlot || !avStart || !avEnd)
    return res.json({
      type: "error",
      message: "Available Spot, Start date, and End date required.",
    });

  if (isDate(avStart) || isDate(avEnd))
    return res.json({ type: "error", message: "Invalid date." });

  const userid = req.context.uid;

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

export default profileRouter;
