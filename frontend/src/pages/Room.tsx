import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function Room() {
  const { ctx, dispatch } = useContext(SocketContext);
  const socket = ctx.socket;
  const { roomId } = useParams<{ roomId: string }>();
  const [player, setPlayer] = useState(1);

  const getPokemon = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/pokeBattle/getData"
      );
      dispatch({ type: "SET_USER_POKEMON", payload: response.data });
      // gotPokemon();
    } catch (error) {
      console.log(error);
    }
  };

  const player2 = () => {
    socket.on("player2-joined", (data: any) => {
      setPlayer(2);
    });
  };

  

  useEffect(() => {
    player2();
    ctx.setRoomId(roomId);
  }, [roomId]);

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <button onClick={getPokemon}>Get Pokemon</button>
    </div>
  );
}

export default Room;
