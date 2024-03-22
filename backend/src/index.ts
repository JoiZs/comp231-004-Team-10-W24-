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
import passport from "passport";
import { passportInit } from "./utils/loginverify";

(async () => {
  // creating instances
  const app = express();
  const port = process.env.PORT;
  const httpServer = createServer(app);
  const io = new Server(httpServer, {});

  // Socket IO connection
  io.on("connection", (socket) => {
    console.log(socket.request);
    socket.on("sendMsg", converse);
  });

  // Middleware
  app.use(
    cors({
      origin: process.env.ENV == "development" ? "localhost" : "",
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESS_SECT!,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
  passportInit(app);

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
