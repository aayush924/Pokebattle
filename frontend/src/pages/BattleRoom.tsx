import React from "react";

function BattleRoom({ ctx, socket, roomId, player, data, dispatch }: any) {
  const [playerChance, setPlayerChance] = React.useState(data.playerChance);

  socket.on("complete-turn", (data: any, attack: any) => {
    console.log("complete-turn");
    console.log(data.data);
    setPlayerChance(data.data.playerChance);
    if (player == 1) {
      dispatch({
        type: "SET_USER_POKEMON_HEALTH",
        payload: data.data.p1.health,
      });
      dispatch({ type: "SET_USER_POKEMON_COUNT", payload: data.data.p1.count });
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
      dispatch({ type: "SET_USER_POKEMON_COUNT", payload: data.data.p2.count });
      dispatch({
        type: "SET_OPPONENT_POKEMON_HEALTH",
        payload: data.data.p1.health,
      });
      dispatch({
        type: "SET_OPPONENT_POKEMON_COUNT",
        payload: data.data.p1.count,
      });
    }
  });

  const attackHandler = (attack: number) => {
    console.log("attack");
    // p1
    dispatch({
      type: "SET_OPPONENT_POKEMON_HEALTH",
      payload: ctx.opponentPokemonHealth - attack,
    });
    // add a check to see if the pokemon is dead
    // if (ctx.opponentPokemonHealth <= 0) {
    //   dispatch({ type: "SET_OPPONENT_POKEMON_COUNT", payload: 0 });
    //   dispatch({ type: "SET_OPPONENT_POKEMON", payload: [] });
    // }
    if (player == 1) {
      data.playerChance = 2;
      data.p1 = {
        health: ctx.userPokemonHealth,
        count: ctx.userPokemonCount,
      };
      data.p2 = {
        health: ctx.opponentPokemonHealth - attack,
        count: ctx.opponentPokemonCount,
      };
      setPlayerChance(2);
    } else {
      data.playerChance = 1;
      data.p1 = {
        health: ctx.opponentPokemonHealth - attack,
        count: ctx.opponentPokemonCount,
      };
      data.p2 = {
        health: ctx.userPokemonHealth,
        count: ctx.userPokemonCount,
      };
      setPlayerChance(1);
    }
    socket.emit("attack", { data, attack, roomId });
  };
  console.log(ctx);

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <h1>Player: {player}</h1>
      <div>
        <div>
          {ctx.userPokemon && (
            <div>
              <img src={ctx.userPokemon?.sprites.back_default} />
              health: {ctx.userPokemonHealth}
            </div>
          )}
        </div>
        <div>
          {ctx.opponentPokemon && (
            <div>
              <img src={ctx.opponentPokemon?.sprites.front_default} />
              health: {ctx.opponentPokemonHealth}
            </div>
          )}
        </div>
        <div>
          {playerChance == player ? (
            <button
              onClick={() => {
                attackHandler(10);
              }}
            >
              Attack
            </button>
          ) : (
            <div>Waiting for opponent</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BattleRoom;
