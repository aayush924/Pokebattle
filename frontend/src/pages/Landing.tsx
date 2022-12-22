import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../socketContext";

function Landing() {
  const socket = useContext(SocketContext)
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

  const sendMessage = () => {
    socket.emit("message", "Hello", roomId);

  };

  useEffect(() => {
    socket && socket.on("message", (data: any) => {
      console.log(data);
    });
  }, []);
  return (
    <div className="App">
      <h1>Socket.io Client</h1>
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={sendMessage}>Send Message</button>
      <input type="text" onChange={(e) => setRoomId(e.target.value)}/>
    </div>
  );
}

export default Landing;
