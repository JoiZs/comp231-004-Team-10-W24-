import { Server, Socket } from "socket.io";
import prisma from "../utils/prismaClient";
import { uploadImg } from "../utils/imgupload";

export const converse = async (
  sender: string,
  receiver: string,
  roomid: string,
  msg: { type: string; msgTxt: string; img: any },
  io: Server,
  sk: Socket
) => {
  const findMsgRoom = await prisma.chatRoom.findFirst({
    where: {
      roomId: roomid,
      reservation: {
        OR: [
          { ownerId: sender, sitterId: receiver },
          { ownerId: receiver, sitterId: sender },
        ],
      },
    },
  });

  if (!findMsgRoom) {
    io.emit("sendMsg", { type: "error", message: "No room found." });
  }

  if (msg.type == "text") {
    await prisma.message
      .create({
        data: {
          ChatRoom: { connect: { roomId: roomid } },
          type: msg.type,
          messageText: msg.msgTxt,
        },
      })
      .then((res) => {
        io.emit("sendMsg", {
          type: "success",
          message: "Sent a message",
          data: res,
        });
      });
  } else if (msg.type == "img") {
    console.log(msg.img);
  }
};
