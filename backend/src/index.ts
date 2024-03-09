import "dotenv/config";
import express from "express";
import router from "./router";
import { Server } from "socket.io";
import { createServer } from "http";


const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {});

app.use("/", router);

httpServer.listen(port, () => {
  console.log(`UP! http://localhost:${port}`);
});
