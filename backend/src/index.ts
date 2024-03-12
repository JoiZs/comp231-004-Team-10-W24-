import "dotenv/config";
import "./types/context";
import express from "express";
import { authRouter, profileRouter, reservRouter } from "./router";
import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import prisma from "./utils/prismaClient";

(async () => {
  // creating instances
  const app = express();
  const port = process.env.PORT;
  const httpServer = createServer(app);
  const io = new Server(httpServer, {});

  // Socket IO connection
  io.on("connection", (socket) => {});

  // Middleware
  app.use(
    cors({
      origin: process.env.ENV == "development" ? "localhost" : "",
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());

  // Routes
  app.use("/auth", authRouter);
  app.use("/profile", profileRouter);
  app.use("/reserve", reservRouter);

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
