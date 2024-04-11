import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthCtx } from "../context";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { skio } from "../utils/socketio";
import { _ } from "lodash";

const ChatRoom = () => {
  const msgRef = useRef(null);
  const { cid } = useParams();
  const [isRoom, setIsRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const { isAuth } = useContext(AuthCtx);
  const [scrollPg, setScrollPg] = useState(1);

  const toast = useToast();

  useEffect(() => {
    skio.on("connection", (sk) => {});
    skio.on("sendMsg", (pl) => setMessages((prevMsg) => [...prevMsg, pl.data]));

    const getRoom = async () => {
      await axios
        .post(
          "http://localhost:4000/chat/reserv",
          { reservId: cid, scrollBox: scrollPg },
          { withCredentials: true }
        )
        .then(async (el) => {
          if (el.data.type == "error") {
            setIsRoom({});
          } else {
            setIsRoom(el.data.data);
            setMessages(el.data.data.message);
          }
        });
    };

    getRoom();
  }, [cid, scrollPg]);

  const msgSendHandler = () => {
    const msg = msgRef.current.value;

    skio.emit("sendMsg", {
      receiver: isRoom?.isOwner
        ? isRoom?.reservation?.sitter?.userId
        : isRoom?.reservation?.owner?.userId,
      roomid: isRoom.roomId,
      msg: { type: "text", msgTxt: msg, img: undefined },
    });
  };

  const followHandler = async () => {
    if (isRoom?.isFollowed) {
      await axios
        .patch(
          "http://localhost:4000/profile/unsub",
          { sitterId: isRoom?.reservation?.sitter?.userId },
          { withCredentials: true }
        )
        .then((res) => {
          toast({
            title: "Unfollow",
            description: res.data.message,
            duration: 1000,
            status: res.data.type,
          });
        });
    } else {
      await axios
        .patch(
          "http://localhost:4000/profile/sub",
          { sitterId: isRoom?.reservation?.sitter?.userId },
          { withCredentials: true }
        )
        .then((res) => {
          toast({
            title: "Follow",
            description: res.data.message,
            duration: 1000,
            status: res.data.type,
          });
        });
    }
  };

  const scrollPgHandler = () => {
    setScrollPg(scrollPg + 1);
  };

  return (
    <div className="max-w-lg w-full flex flex-1">
      {!isRoom ? (
        <span>No chatroom is found.</span>
      ) : (
        <div className=" w-full h-full grid grid-rows-9 p-4">
          <div className="flex justify-between items-center">
            <div className="text-base font-medium flex  items-center gap-3">
              <Avatar
                size={"sm"}
                name={
                  isRoom?.isOwner
                    ? `${isRoom?.reservation?.sitter?.firstname} 
                    ${isRoom?.reservation?.sitter?.lastname}`
                    : `${isRoom?.reservation?.owner?.firstname} 
                    ${isRoom?.reservation?.owner?.lastname}`
                }
              />
              <span>
                {isRoom?.isOwner
                  ? `${isRoom?.reservation?.sitter?.firstname} 
                    ${isRoom?.reservation?.sitter?.lastname}`
                  : `${isRoom?.reservation?.owner?.firstname} 
                    ${isRoom?.reservation?.owner?.lastname}`}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <Button onClick={followHandler} size={"xs"} variant={"outline"}>
                  {isRoom?.isFollowed ? "Followed" : "Follow"}
                </Button>
              </div>
              <Tooltip label="Submit">
                <Link to={`/confirm/${cid}`}>
                  <CheckCircleIcon
                    _hover={{ color: "gray" }}
                    cursor={"pointer "}
                  />
                </Link>
              </Tooltip>
            </div>
          </div>
          <div className="row-span-8">
            <Divider />

            <div className="grid grid-rows-8">
              <div className="row-span-7 overflow-y-scroll max-h-[30rem] pr-6 scroll-smooth py-3 text-sm">
                {messages.length == 25 && (
                  <div className="flex justify-center items-center p-1">
                    <Button
                      onClick={scrollPgHandler}
                      size={"xs"}
                      rounded={"full"}
                      variant={"outline"}
                    >
                      Load More
                    </Button>
                  </div>
                )}
                {_.sortBy(messages, ["createdAt"]).map((el) => (
                  <div
                    key={el.chatId}
                    className="flex flex-col flex-wrap gap-2 py-[0.1rem]"
                  >
                    <span
                      className={`rounded-lg px-3 p-1  text-wrap ${
                        el.senderId === isAuth?.userId
                          ? "self-end bg-blue-400 text-white ml-20 rounded-br-none"
                          : "self-start border mr-20 rounded-bl-none"
                      }`}
                    >
                      {el.messageText}
                    </span>
                  </div>
                ))}
              </div>
              <div className="row-span-1">
                <Divider />
                <div className="flex items-center h-full ">
                  <div className="flex justify-between w-full gap-4">
                    <div className="flex-1">
                      <Input
                        ref={msgRef}
                        borderRadius={"5rem"}
                        type="text"
                        placeholder="Type something..."
                      />
                    </div>
                    <div className="flex items-center">
                      <ChevronUpIcon
                        onClick={msgSendHandler}
                        cursor={"pointer"}
                        _hover={{ color: "gray" }}
                        boxSize={"4"}
                        border={"1px"}
                        borderRadius={"full"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
