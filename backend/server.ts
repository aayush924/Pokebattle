import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
// mounting socket.io onto the express server
const pokeServer = createServer(app);

const io = new Server(pokeServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use("/api/v1/pokeBattle", require("./routes"));

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("create-room", (roomName: string) => {
    socket.join(roomName);
    console.log(socket.id, "room created", roomName);
    console.log("room members", io.sockets.adapter.rooms.get(roomName));
  });

  socket.on("join-room", (roomName: string) => {
    if (io.sockets.adapter.rooms.get(roomName)!.size === 1) {
      socket.to(roomName).emit("player2-joined");
      socket.join(roomName);
      console.log(socket.id, "joined room", roomName);
      console.log("room members", io.sockets.adapter.rooms.get(roomName));
    } else if (io.sockets.adapter.rooms.get(roomName)!.size === 0) {
      socket.emit("room-does-not-exist");
    } else {
      socket.emit("room-full");
    }
  });

  socket.on("player2-clicked-ready", (pokeData: any) => {
    socket.to(pokeData.roomId).emit("player2-is-ready", pokeData);
  });

  socket.on("player1-clicked-ready", (pokeData: any) => {
    socket.to(pokeData.roomId).emit("player1-is-ready", pokeData);
  });
});

pokeServer.listen(8000, () => {
  console.log("port: 8000");
});
