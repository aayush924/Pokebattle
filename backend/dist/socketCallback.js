"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketCallback = (socket, io) => {
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
};
exports.default = socketCallback;
