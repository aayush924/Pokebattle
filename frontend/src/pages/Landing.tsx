import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

function Landing() {
  const { ctx } = useContext(SocketContext);
  const socket = ctx.socket;
  const [roomId, setRoomId] = useState("");
  const nav = useNavigate();

  const createRoom = () => {
    socket.emit("create-room", roomId);
    nav(`/room/${roomId}`);
  };

  const joinRoom = () => {
    socket.emit("join-room", roomId);
    nav(`/room/${roomId}`);
  };

  return (
    <div className="App">
      <h1>Socket.io Client</h1>
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
      <input type="text" onChange={(e) => setRoomId(e.target.value)} />
    </div>
  );
}

export default Landing;
