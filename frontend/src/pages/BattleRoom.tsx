import React from "react";
import { useNavigate } from "react-router-dom";
import Moveset from "./Moveset";

function HealthBar({ health }: any) {
  console.log(health);

  let healthPercentage = health - (health / 200) * 100;
  return (
    <div className="healthbar">
      <div
        className="healthbar_health"
        style={{ width: `${healthPercentage}%` }}
      ></div>
    </div>
  );
}

function BattleRoom({ ctx, socket, roomId, player, data, dispatch }: any) {
  const [playerChance, setPlayerChance] = React.useState(data.playerChance);
  const [over, setOver] = React.useState(false);
  const [victory, setVictory] = React.useState("");
  const nav = useNavigate();

  socket.on("over", (player: number) => {
    if (player == 1) {
      console.log("Player 1 won");
      setVictory("Player 1 won");
    } else {
      console.log("Player 2 won");
      setVictory("Player 2 won");
    }
    setOver(true);
  });

  socket.on("complete-turn", (data: any, attack: any) => {
    console.log("complete-turn");
    let winner: number = 0;
    if (data.data.p1.count == 0) {
      console.log("p1 count 0");
      winner = 2;
      socket.emit("defeated", { roomId, winner });
      setVictory("Player 2 won");
      setOver(true);
    } else if (data.data.p2.count == 0) {
      console.log("p2 count 0");
      winner = 1;
      socket.emit("defeated", { roomId, winner });
      setVictory("Player 1 won");
      setOver(true);
    } else {
      setPlayerChance(data.data.playerChance);
      if (player == 1) {
        dispatch({
          type: "SET_USER_POKEMON_HEALTH",
          payload: data.data.p1.health,
        });
        dispatch({
          type: "SET_USER_POKEMON_COUNT",
          payload: data.data.p1.count,
        });
        dispatch({
          type: "SET_OPPONENT_POKEMON_HEALTH",
          payload: data.data.p2.health,
        });
        dispatch({
          type: "SET_OPPONENT_POKEMON_COUNT",
          payload: data.data.p2.count,
        });
      } else {
        dispatch({
          type: "SET_USER_POKEMON_HEALTH",
          payload: data.data.p2.health,
        });
        dispatch({
          type: "SET_USER_POKEMON_COUNT",
          payload: data.data.p2.count,
        });
        dispatch({
          type: "SET_OPPONENT_POKEMON_HEALTH",
          payload: data.data.p1.health,
        });
        dispatch({
          type: "SET_OPPONENT_POKEMON_COUNT",
          payload: data.data.p1.count,
        });
      }
    }
  });

  const attackHandler = (attack: number) => {
    console.log("attack");
    let defeated = false;
    // p1
    dispatch({
      type: "SET_OPPONENT_POKEMON_HEALTH",
      payload: ctx.opponentPokemonHealth - attack,
    });
    // add a check to see if the pokemon is dead
    if (ctx.opponentPokemonHealth - attack <= 0) {
      dispatch({ type: "SET_OPPONENT_POKEMON_COUNT", payload: 0 });
      defeated = true;
    }
    if (player == 1) {
      data.playerChance = 2;
      if (defeated) {
        data.p1 = {
          health: ctx.userPokemonHealth,
          count: ctx.userPokemonCount,
        };
        data.p2 = {
          health: 0,
          count: 0,
        };
      } else {
        data.p1 = {
          health: ctx.userPokemonHealth,
          count: ctx.userPokemonCount,
        };
        data.p2 = {
          health: ctx.opponentPokemonHealth - attack,
          count: ctx.opponentPokemonCount,
        };
      }
      setPlayerChance(2);
    } else {
      data.playerChance = 1;
      if (defeated) {
        data.p1 = {
          health: 0,
          count: 0,
        };
        data.p2 = {
          health: ctx.userPokemonHealth,
          count: ctx.userPokemonCount,
        };
      } else {
        data.p1 = {
          health: ctx.opponentPokemonHealth - attack,
          count: ctx.opponentPokemonCount,
        };
        data.p2 = {
          health: ctx.userPokemonHealth,
          count: ctx.userPokemonCount,
        };
      }
      setPlayerChance(1);
    }
    socket.emit("attack", { data, attack, roomId });
  };

  return (
    <div>
      <h1>Player: {player}</h1>
      <div>
        {over ? (
          <>
            <h1>Game Over</h1>
            <div>{victory}</div>
            <button
              onClick={() => {
                socket.emit("leave-room", { roomName: roomId, player });
                nav("/");
              }}
            >
              Leave Room
            </button>
          </>
        ) : (
          <>
            <div className="user">
              {ctx.userPokemon && (
                <div>
                  <img src={ctx.userPokemon?.sprites.back_default} />
                  <HealthBar health={ctx.userPokemonHealth} />
                </div>
              )}
            </div>
            <div className="opponent">
              {ctx.opponentPokemon && (
                <div>
                  <img src={ctx.opponentPokemon?.sprites.front_default} />
                  <HealthBar health={ctx.opponentPokemonHealth} />
                </div>
              )}
            </div>
            <div>
              {playerChance == player ? (
                // <Moveset />
                <div>
                  <button onClick={() => attackHandler(50)}>Attack</button>
                </div>
              ) : (
                <div>Waiting for opponent ...</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BattleRoom;
