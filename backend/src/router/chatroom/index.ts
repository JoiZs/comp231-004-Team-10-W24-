import { Router } from "express";
import prisma from "../../utils/prismaClient";
import { isAuthenticated } from "../../utils/loginverify";

const chatroomRouter = Router();

chatroomRouter.post("/reserv", isAuthenticated, async (req, res) => {
  const userid = req.user.userid;
  const { reservId, scrollBox = 1 } = req.body;

  const chatRoom = await prisma.chatRoom.findFirst({
    where: {
      reservationId: reservId,
      reservation: { OR: [{ sitterId: userid }, { ownerId: userid }] },
    },
    include: {
      reservation: {
        select: {
          owner: {
            select: {
              userId: true,
              firstname: true,
              lastname: true,
              followedBy: { select: { userId: true } },
            },
          },
          sitter: {
            select: {
              userId: true,
              firstname: true,
              lastname: true,
              followedBy: { select: { userId: true } },
            },
          },
        },
      },
      message: { take: 25 * scrollBox, orderBy: { createdAt: "desc" } },
    },
  });

  if (!chatRoom)
    return res.json({ type: "error", message: "No chatroom found." });

  return res.json({
    type: "success",
    message: "Messages are found in the chatroom.",
    data: {
      ...chatRoom,
      isOwner: chatRoom.reservation.owner.userId === userid,
      isFollowed: chatRoom.reservation.sitter.followedBy.some(
<<<<<<< HEAD
        (fl) => fl.userId === userid
=======
        (fl: { userId: string }) => fl.userId === userid
>>>>>>> b2d7069 (build(docker): dockerize the app)
      ),
    },
  });
});

export default chatroomRouter;
