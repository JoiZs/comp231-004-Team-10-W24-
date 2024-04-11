import { Router } from "express";
import prisma from "../../utils/prismaClient";
import { isAuthenticated } from "../../utils/loginverify";

const reservRouter = Router();

reservRouter.post("/onereserv", isAuthenticated, async (req, res) => {
  const { resId } = req.body;

  const reserv = await prisma.reservation.findFirst({
    where: { reserveId: resId },
    include: {
      owner: { select: { firstname: true, lastname: true, email: true } },
      sitter: { select: { firstname: true, lastname: true, email: true } },
    },
  });

  if (!reserv)
    return res.json({
      type: "error",
      message: `Found no reservation.`,
    });

  return res.json({
    type: "success",
    message: `Found 1 reservation.`,
    data: reserv,
  });
});

reservRouter.post("/reserv", isAuthenticated, async (req, res) => {
  const userid = req.user.userid;
  const { status } = req.body;

  const reservs = await prisma.reservation.findMany({
    where: {
      OR: [{ ownerId: userid }, { sitterId: userid }],
      ...(status && { status: status }),
    },
    orderBy: { updatedAt: "desc" },
    include: {
      owner: { select: { firstname: true, lastname: true, email: true } },
      sitter: { select: { firstname: true, lastname: true, email: true } },
    },
  });

  return res.json({
    type: "success",
    message: `Found ${reservs.length} reservations.`,
    data: reservs,
  });
});

reservRouter.patch("/req_updatereserv", isAuthenticated, async (req, res) => {
  const userid = req.user.userid;
  const { resvId, dayRate, petCount, checkIn, checkOut } = req.body;

  try {
    await prisma.reservation.update({
      where: {
        reserveId: resvId,
        ownerId: userid,
      },
      data: {
        ...(dayRate && { ratePerDay: dayRate }),
        ...(petCount && { petCount: petCount }),
        ...(checkIn && { checkIn: new Date(checkIn) }),
        ...(checkOut && { checkOut: new Date(checkOut) }),
        status: "Pending",
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      type: "error",
      message: "Internal Server Error",
    });
  }
  return res.json({
    type: "success",
    message: "Successfully changed the reservation info.",
  });
});

reservRouter.patch("/acpt_updatereserv", isAuthenticated, async (req, res) => {
  const userid = req.user.userid;
  const { resvId, status = "Pending" } = req.body;

  try {
    await prisma.reservation.update({
      where: { reserveId: resvId, sitterId: userid },
      data: { status: status },
    });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.json({ type: "error", message: "Updating is not allowed." });
    }
  }

  return res.json({
    type: "success",
    message: `Changed the reservation status to ${status}.`,
  });
});

reservRouter.post("/create", isAuthenticated, async (req, res) => {
  const userid = req.user.userid;
  const {
    sitterId,
    petCount = 1,
    petType,
    checkIn,
    checkOut,
    ratePerDay,
    messageTxt,
  } = req.body;

  if (!petType || !checkIn || !checkOut || !ratePerDay || !sitterId)
    return res.json({
      type: "error",
      message: "Incomplete input to create a reservation.",
    });

  try {
    await prisma.reservation.create({
      data: {
        petType,
        petCount,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        ratePerDay,
        sitterId,
        status: "Pending",
        ownerId: userid,
        ChatRoom: {
          create: {
            message: {
              create: {
                type: "text",
                messageText: messageTxt,
                sender: { connect: { userId: userid } },
                receiver: {
                  connect: { userId: sitterId },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.json({
        type: "error",
        message: "Unable to make a reservation.",
      });
    }
  }

  return res.json({
    type: "success",
    message: "Successfully created a reservation.",
  });
});

reservRouter.patch("/req_cancel", isAuthenticated, async (req, res) => {
  const userid = req.user.userid;
  const { reservId } = req.body;

  const checkRes = await prisma.reservation.findFirst({
    where: { ownerId: userid, reserveId: reservId },
  });

  if (!checkRes)
    return res.json({ type: "error", message: "No reservation found." });

  try {
    if (checkRes.checkIn.getTime() >= Date.now()) {
      await prisma.reservation.update({
        where: { ownerId: userid, reserveId: reservId },
        data: {
          status: "cancel",
        },
      });
      return res.json({
        type: "success",
        message: "Cancelled, no cancellation fee will be applied.",
      });
    } else {
      await prisma.reservation.update({
        where: { ownerId: userid, reserveId: reservId },
        data: {
          status: "cancel",
        },
      });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return res.json({
        type: "error",
        message: "Unable to cancel the reservation.",
      });
    }
  }

  return res.json({
    type: "success",
    message: "Cancelled, cancallation fee will be applied.",
  });
});

export default reservRouter;
