import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
// mounting socket.io onto the express server
const pokeServer = createServer(app);

const io = new Server(pokeServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  // on disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("create-room", (roomName: string) => {
    socket.join(roomName);
    console.log(socket.id , "room created", roomName);
  });

  socket.on("join-room", (roomName: string) => {
    socket.join(roomName);
    console.log(socket.id,"joined room", roomName);
    console.log("room members", io.sockets.adapter.rooms.get(roomName));
  });

  socket.on("message", (message: string,roomName: string,) => {
    console.log("message", message);
    io.to(roomName).emit("message", message);
  })
});

pokeServer.listen(3000, () => {
  console.log("port: 3000");
});
