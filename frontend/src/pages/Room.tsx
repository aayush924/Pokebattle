import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lobby from "./Lobby";
import BattleRoom from "./BattleRoom";

function Room() {
  const { ctx, dispatch } = useContext(SocketContext);
  const socket = ctx.socket;
  const { roomId } = useParams<{ roomId: string }>();
  const [player, setPlayer] = useState(2);
  const [ready, setReady] = useState(false);
  const [gotPokemon, setGotPokemon] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);

  const getPokemon = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/pokeBattle/getData"
      );
      setReady(true);
      dispatch({ type: "SET_USER_POKEMON", payload: response.data.data[0] });
      dispatch({ type: "SET_USER_POKEMON_COUNT", payload: 1 });
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

  // getters
  if (player === 1) {
    socket.on("player2-is-ready", (data: any) => {
      dispatch({ type: "SET_OPPONENT_POKEMON", payload: data.pokemon });
      dispatch({ type: "SET_OPPONENT_POKEMON_HEALTH", payload: 200 });
      dispatch({ type: "SET_OPPONENT_POKEMON_COUNT", payload: 1 });
      setOpponentReady(true);
    });
  } else {
    socket.on("player1-is-ready", (data: any) => {
      dispatch({ type: "SET_OPPONENT_POKEMON", payload: data.pokemon });
      dispatch({ type: "SET_OPPONENT_POKEMON_HEALTH", payload: 200 });
      dispatch({ type: "SET_OPPONENT_POKEMON_COUNT", payload: 1 });
      setOpponentReady(true);
    });
  }

  const startBattle = () => {
    setBattleStarted(true);
  };

  type DATA = {
    roomId: any;
    playerChance: number;
    p1: {
      health: number;
      count: number;
    };
    p2: {
      health: number;
      count: number;
    };
  };

  const data: DATA = {
    roomId: roomId,
    playerChance: 1,
    p1: {
      health: ctx.userPokemonHealth,
      count: ctx.userPokemonCount,
    },
    p2: {
      health: ctx.opponentPokemonHealth,
      count: ctx.opponentPokemonCount,
    },
  };

  useEffect(() => {
    ctx.setRoomId(roomId);
  }, [roomId]);

  return (
    <div>
      {battleStarted ? (
        <BattleRoom
          ctx={ctx}
          socket={socket}
          roomId={roomId}
          player={player}
          data={data}
          dispatch={dispatch}
        />
      ) : (
        <Lobby
          ctx={ctx}
          socket={socket}
          roomId={roomId}
          player={player}
          ready={ready}
          gotPokemon={gotPokemon}
          opponentReady={opponentReady}
          getPokemon={getPokemon}
          startBattle={startBattle}
          pokeData={pokeData}
        />
      )}
    </div>
  );
}

export default Room;
