import "dotenv/config";
import express from "express";
import { authRouter, profileRouter, reservRouter } from "./router";
import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";
import cors from "cors";

// creating instances
const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {});

// Socket IO connection
io.on("connection", (socket) => {});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth/", authRouter);
app.use("/profile/", profileRouter);
app.use("/reserve/", reservRouter);

// Listening HTTP Server
httpServer.listen(port, () => {
  console.log(`UP! http://localhost:${port}`);
});
