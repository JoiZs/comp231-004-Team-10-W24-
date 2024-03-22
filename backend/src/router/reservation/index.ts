import { Router } from "express";
import prisma from "../../utils/prismaClient";
import { isDate } from "validator";
import { isAuthenticated } from "../../utils/loginverify";

const reservRouter = Router();

reservRouter.get("/reserv", isAuthenticated, async (req, res) => {
  const userid = req.context.uid;
  const { status } = req.body;

  const reservs = await prisma.reservation.findMany({
    where: {
      OR: [{ ownerId: userid }, { sitterId: userid }],
      ...(status && { status: status }),
    },
  });

  return res.json({
    type: "success",
    message: `Found ${reservs.length} reservations.`,
    data: reservs,
  });
});

reservRouter.patch("/req_updatereserv", isAuthenticated, async (req, res) => {
  const userid = req.context.uid;
  const { resvId, dayRate, petCount, petType, checkIn, checkOut } = req.body;

  if (checkIn || checkOut)
    if (!isDate(checkIn) || !isDate(checkOut)) {
      return res.json({ type: "error", message: "Invalid date Format." });
    } else if (
      new Date(checkIn).getTime() <= Date.now() ||
      new Date(checkOut).getTime() <= Date.now() ||
      new Date(checkOut).getTime() <= new Date(checkIn).getTime()
    ) {
      return res.json({
        type: "error",
        message: "Invalid checkin, checkout dates.",
      });
    }

  try {
    await prisma.reservation.upsert({
      where: { reserveId: resvId, ownerId: userid, status: { not: "reject" } },
      update: {
        ...(dayRate && { ratePerDay: dayRate }),
        ...(petCount && { petCount: petCount }),
        ...(petType && { petType: petType }),
        ...(checkIn && { checkIn: new Date(checkIn) }),
        ...(checkOut && { checkOut: new Date(checkOut) }),
        status: "pending",
      },
      create: {
        ...(dayRate && { ratePerDay: dayRate }),
        ...(petCount && { petCount: petCount }),
        ...(petType && { petType: petType }),
        ...(checkIn && { checkIn: new Date(checkIn) }),
        ...(checkOut && { checkOut: new Date(checkOut) }),
        status: "pending",
      },
    });
  } catch (error) {}
});

reservRouter.patch("/acpt_updatereserv", isAuthenticated, async (req, res) => {
  const userid = req.context.uid;
  const { resvId, status = "pending" } = req.body;

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
  const userid = req.context.uid;
  const {
    sitterId,
    petCount = 1,
    petType,
    checkIn,
    checkOut,
    ratePerDay,
    messageTxt,
  } = req.body;

  if (
    !petType ||
    !isDate(checkIn) ||
    !isDate(checkOut) ||
    !ratePerDay ||
    !sitterId
  )
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
        status: "pending",
        ownerId: userid,
        ChatRoom: {
          create: {
            message: { create: { type: "text", messageText: messageTxt } },
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
  const userid = req.context.uid;
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
