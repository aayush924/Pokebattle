import Button from "@mui/material/Button";
import { useState } from "react";

const ButtonStyle = {
  backgroundColor: "#DF593A",
  color: "white",
  margin: "10px",
  width: "600px",
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

function Lobby({
  ctx,
  socket,
  player,
  ready,
  gotPokemon,
  opponentReady,
  getPokemon,
  startBattle,
  pokeData,
}: any) {
  const [clickedReady, setClickedReady] = useState(false);
  console.log(ctx.opponentPokemon.length);
  
  return (
    <div className="lobby_cards">
      {ready ? (
        <>
          {!clickedReady && (
            <Button
              onClick={() => {
                if (player == 2) {
                  socket.emit("player2-clicked-ready", pokeData);
                  setClickedReady(true);
                } else {
                  socket.emit("player1-clicked-ready", pokeData);
                  setClickedReady(true);
                }
              }}
              sx={OButtonStyle}
              variant="outlined"
            >
              Ready?
            </Button>
          )}
        </>
      ) : (
        <Button onClick={getPokemon} sx={OButtonStyle} variant="outlined">
          Get Pokemon
        </Button>
      )}
      <div className="layout">
        <div className="card">
          <h1>Your Pokemon</h1>
          {gotPokemon && <img src={ctx.userPokemon?.sprites.front_default} />}
        </div>
        <div className="card">
          <h1>Opponent</h1>
          {opponentReady && (
            <img src={ctx.opponentPokemon?.sprites.front_default} />
          )}
        </div>
      </div>
      <div>
        <Button
          onClick={startBattle}
          variant="contained"
          sx={ButtonStyle}
          disabled={ctx.opponentPokemon.length == 0}
        >
          Start Battle
        </Button>
      </div>
    </div>
  );
}

export default Lobby;
