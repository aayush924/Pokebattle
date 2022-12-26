import React from 'react'

function Lobby({
  ctx,
  socket,
  roomId,
  player,
  ready,
  gotPokemon,
  opponentReady,
  getPokemon,
  startBattle,
  pokeData,
}: any) {
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
              {gotPokemon && (
                <img src={ctx.userPokemon?.sprites.front_default} />
              )}
            </div>
            <div>
              <h1>Opponent Pokemon</h1>
              <p>if you see your opponentPokemon, it means they are ready</p>
              {opponentReady && (
                <img src={ctx.opponentPokemon?.sprites.front_default} />
              )}
            </div>
            <div>
              <button onClick={startBattle}>Start Battle</button>
            </div>
          </div>
    </div>
  )
}

export default Lobby