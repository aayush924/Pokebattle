import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import NavBar from "./NavBar";
import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ButtonStyle = {
  backgroundColor: "#DF593A",
  color: "white",
  margin: "10px",
  width: "200px",
  height: "50px",
  fontSize: "20px",
  fontFamily: "Poppins",
  fontWeight: "bold",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#DF593A",
    color: "white",
  },
};

const OButtonStyle = {
  backgroundColor: "white",
  color: "#DF593A",
  margin: "10px",
  width: "200px",
  height: "50px",
  fontSize: "20px",
  fontFamily: "Poppins",
  borderRadius: "10px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#DF593A",
    color: "white",
  },
};

const TextFieldStyle = {
  margin: "10px",
  fontSize: "20px",
  fontFamily: "Poppins",
  fontWeight: "bold",
};

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
      <NavBar isRoom={roomId} />
      <div className="landing_div">
        <h1>PokeBattle</h1>
        <Button onClick={createRoom} variant="contained" sx={ButtonStyle}>
          Create Room
        </Button>
        <Button onClick={joinRoom} variant="outlined" sx={OButtonStyle}>
          Join Room
        </Button>
        <TextField
          id="outlined-basic"
          label="Room ID"
          variant="outlined"
          sx={TextFieldStyle}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Landing;
