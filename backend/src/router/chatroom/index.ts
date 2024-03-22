import { Router } from "express";

import prisma from "../../utils/prismaClient";
import { isAuthenticated } from "../../utils/loginverify";

const chatroomRouter = Router();

chatroomRouter.post("/reserv", isAuthenticated, async (req, res) => {
  const userid = req.context.uid;
  const { reservId, msgScroll = 1 } = req.body;

  const chatRoom = await prisma.chatRoom.findFirst({
    where: {
      reservationId: reservId,
      reservation: { OR: [{ sitterId: userid }, { ownerId: userid }] },
    },
    select: {
      message: { take: 10 * msgScroll, orderBy: { createdAt: "desc" } },
    },
  });

  if (!chatRoom)
    return res.json({ type: "error", message: "No chatroom found." });

  return res.json({
    type: "success",
    message: "Messages are found in the chatroom.",
    data: chatRoom,
  });
});

export default chatroomRouter;
