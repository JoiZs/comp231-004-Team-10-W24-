require("dotenv/config");
const router = require("./router");
const { Server } = require("socket.io");
const { createServer } = require("http");

const express = require("express");

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {});

app.use("/", router);

httpServer.listen(port, () => {
  console.log(`UP! http://localhost:${port}`);
});
