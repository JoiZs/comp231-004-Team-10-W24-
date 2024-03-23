import "dotenv/config";
import "./types/context";
import "./utils/loginverify";
import express from "express";
import {
  authRouter,
  chatroomRouter,
  profileRouter,
  reservRouter,
  reviewRouter,
} from "./router";
import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import prisma from "./utils/prismaClient";
import { converse } from "./socket/converse";
import session from "express-session";
import { onlyForHandshake, passportInit } from "./utils/loginverify";
import passport from "passport";

(async () => {
  // creating instances
  const app = express();
  const port = process.env.PORT;
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_HOST,
      credentials: true,
    },
  });
  const sessionMW = session({
    secret: process.env.SESS_SECT!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "lax",
    },
  });

  // Middleware
  app.use(
    cors({
      origin: process.env.CLIENT_HOST,
      credentials: true,
    })
  );
  app.use(sessionMW);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json());
  app.use(cookieParser(process.env.SESS_SECT!));
  passportInit(app);

  // Socket IO connection
  io.engine.use(onlyForHandshake(sessionMW));
  io.engine.use(onlyForHandshake(passport.session()));

  io.use((socket, next) => {
    console.log(socket.request.user);
    if (!socket.request.user) {
      // Emit event to client for redirection or error display
      socket.emit("unauthorized");
      return next(new Error("Unauthorized"));
    }
    next();
  });

  io.on("connection", (socket) => {
    const userid = socket.request.user.userid;

    socket.on("sendMsg", (payload) =>
      converse(
        userid,
        payload.receiver,
        payload.roomid,
        payload.msg,
        io,
        socket
      )
    );
  });

  app.use("/profiles/", express.static("public/data/profiles"));
  app.use("/msgs/", express.static("public/data/messages"));

  // Routes
  app.use("/auth", authRouter);
  app.use("/profile", profileRouter);
  app.use("/reserve", reservRouter);
  app.use("/chat", chatroomRouter);
  app.use("/review", reviewRouter);

  // Listening HTTP Server
  httpServer.listen(port, () => {
    console.log(`UP! http://localhost:${port}`);
  });
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
