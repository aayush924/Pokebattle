import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function Room() {
  const { ctx, dispatch } = useContext(SocketContext);
  const socket = ctx.socket;
  const { roomId } = useParams<{ roomId: string }>();
  const [player, setPlayer] = useState(2);
  const [ready, setReady] = useState(false);
  const [gotPokemon, setGotPokemon] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);

  const getPokemon = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/pokeBattle/getData"
      );
      setReady(true);
      dispatch({ type: "SET_USER_POKEMON", payload: response.data.data[0] });
      setGotPokemon(true);
      // gotPokemon();
    } catch (error) {
      console.log(error);
    }
  };

  const pokeData = {
    pokemon: ctx.userPokemon,
    roomId: roomId,
    player: player,
  };

  socket.on("player2-joined", () => {
    setPlayer(1);
  });
  console.log(player);

  // getters
  if (player === 1) {
    socket.on("player2-is-ready", (data: any) => {
      dispatch({ type: "SET_OPPONENT_POKEMON", payload: data.pokemon });
      setOpponentReady(true);
    });
  } else {
    socket.on("player1-is-ready", (data: any) => {
      dispatch({ type: "SET_OPPONENT_POKEMON", payload: data.pokemon });
      setOpponentReady(true);
    });
  }

  useEffect(() => {
    ctx.setRoomId(roomId);
  }, [roomId]);

  return (
    <div>
      <h1>Room: {roomId}</h1>
      {ready ? (
        <button
          onClick={() => {
            if (player == 2) {
              socket.emit("player2-clicked-ready", pokeData);
            } else {
              socket.emit("player1-clicked-ready", pokeData);
            }
          }}
        >
          Ready?
        </button>
      ) : (
        <button onClick={getPokemon}>Get Pokemon</button>
      )}
      <div>
        <h1>Player: {player}</h1>
        <div>
          <h1>Your Pokemon</h1>
          {gotPokemon && <img src={ctx.userPokemon?.sprites.front_default} />}
        </div>
        <div>
          <h1>Opponent Pokemon</h1>
          {opponentReady && (
            <img src={ctx.opponentPokemon?.sprites.front_default} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Room;
