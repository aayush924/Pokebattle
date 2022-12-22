"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
// mounting socket.io onto the express server
const pokeServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(pokeServer, {
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
    socket.on("create-room", (roomName) => {
        socket.join(roomName);
        console.log(socket.id, "room created", roomName);
    });
    socket.on("join-room", (roomName) => {
        socket.join(roomName);
        console.log(socket.id, "joined room", roomName);
        console.log("room members", io.sockets.adapter.rooms.get(roomName));
    });
    socket.on("message", (message, roomName) => {
        console.log("message", message);
        io.to(roomName).emit("message", message);
    });
});
pokeServer.listen(3000, () => {
    console.log("port: 3000");
});
