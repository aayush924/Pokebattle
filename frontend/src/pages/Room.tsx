import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lobby from "./Lobby";
import BattleRoom from "./BattleRoom";
import NavBar from "./NavBar";

function Room() {
  const { ctx, dispatch } = useContext(SocketContext);
  const socket = ctx.socket;
  const { roomId } = useParams<{ roomId: string }>();
  const [player, setPlayer] = useState(2);
  // const [disableReady, setDisableReady] = useState(true);
  const [opponentReady, setOpponentReady] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);

  const pokeData = {
    pokemon: ctx.userPokemon,
    roomId: roomId,
    player: player,
  };

  //  chnage this so that only once the player 2 joins the room, the player 1 can click ready vice versa
  socket.on("player2-joined", () => {
    setPlayer(1);
    // setDisableReady(false);
  });

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
      <NavBar isRoom={roomId} />
      <div className="wrapper">
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
            roomId={roomId}
            player={player}
            opponentReady={opponentReady}
            startBattle={() => setBattleStarted(true)}
            pokeData={pokeData}
          />
        )}
      </div>
    </div>
  );
}

export default Room;
