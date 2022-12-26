"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// mounting socket.io onto the express server
const pokeServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(pokeServer, {
    cors: {
        origin: "*",
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/pokeBattle", require("./routes"));
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("create-room", (roomName) => {
        socket.join(roomName);
        console.log(socket.id, "room created", roomName);
        console.log("room members", io.sockets.adapter.rooms.get(roomName));
    });
    socket.on("join-room", (roomName) => {
        if (io.sockets.adapter.rooms.get(roomName).size === 1) {
            socket.to(roomName).emit("player2-joined");
            socket.join(roomName);
            console.log(socket.id, "joined room", roomName);
            console.log("room members", io.sockets.adapter.rooms.get(roomName));
        }
        else if (io.sockets.adapter.rooms.get(roomName).size === 0) {
            socket.emit("room-does-not-exist");
        }
        else {
            socket.emit("room-full");
        }
    });
    socket.on("player2-clicked-ready", (pokeData) => {
        socket.to(pokeData.roomId).emit("player2-is-ready", pokeData);
    });
    socket.on("player1-clicked-ready", (pokeData) => {
        socket.to(pokeData.roomId).emit("player1-is-ready", pokeData);
    });
    socket.on("attack", (data, attack) => {
        socket.to(data.roomId).emit("complete-turn", data, attack);
    });
    socket.on("defeated", (data) => {
        console.log("defeated", data.roomId, data.winner);
        socket.broadcast.to(data.roomId).emit("over", data.winner);
    });
});
pokeServer.listen(8000, () => {
    console.log("port: 8000");
});
