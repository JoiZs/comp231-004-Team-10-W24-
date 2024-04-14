import { Server, Socket } from "socket.io";
import prisma from "../utils/prismaClient";

export const converse = async (
  sender: string,
  receiver: string,
  roomid: string,
  msg: { type: string; msgTxt: string; img: any },
  io: Server
) => {
  if (msg.type == "text") {
    await prisma.message
      .create({
        data: {
          type: msg.type,
          messageText: msg.msgTxt,
          chatRoomRoomId: roomid,
          senderId: sender,
          receiverId: receiver,
        },
      })
      .then((res: any) => {
        io.emit("sendMsg", {
          type: "success",
          message: "Sent a message",
          data: res,
        });
      });
  } else if (msg.type == "img") {
    // console.log(msg.img);
  }
};
