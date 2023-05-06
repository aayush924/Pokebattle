import Button from "@mui/material/Button";
import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { useContext } from "react";
import { SocketContext } from "../context/socketContext";
import PokeCard from "./PokeCard";

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

function Lobby({ player, opponentReady, startBattle, pokeData }: any) {
  const { ctx, dispatch } = useContext(SocketContext);
  const socket = ctx.socket;
  const [ready, setReady] = useState(false);
  const [clickedReady, setClickedReady] = useState(false);
  console.log(ctx.opponentPokemon.length);
  const [fetching, setFetching] = useState(false);
  const [gotPokemon, setGotPokemon] = useState(false);

  const getPokemon = async () => {
    try {
      setFetching(true);
      const response = await axios.get(
        "http://localhost:8000/api/v1/pokeBattle/getData"
      );
      setReady(true);
      dispatch({ type: "SET_USER_POKEMON", payload: response.data.data[0] });
      dispatch({ type: "SET_USER_POKEMON_HEALTH", payload: 200 });
      dispatch({ type: "SET_USER_POKEMON_COUNT", payload: 1 });
      setGotPokemon(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ctx.userPokemon);

  return (
    <>
      <div className="lobby_cards">
        {ready ? (
          <>
            {!clickedReady ? (
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
                // disabled={disableReady}
              >
                Ready?
              </Button>
            ) : (
              <div
                style={{
                  margin: "10px",
                  width: "200px",
                  height: "50px",
                }}
              ></div>
            )}
          </>
        ) : (
          <Button onClick={getPokemon} sx={OButtonStyle} variant="outlined">
            Get Pokemon
          </Button>
        )}
        <div className="layout">
          <div className="card">
            {fetching ? (
              <>
                {gotPokemon ? (
                  <PokeCard pokemon={ctx.userPokemon} />
                ) : (
                  <Loading />
                )}
              </>
            ) : (
              <>
                <div>
                  <h2>Your Pokemon</h2>
                  click the button to get your pokemon
                </div>
              </>
            )}
          </div>
          VS
          <div className="card">
            {opponentReady ? (
              <PokeCard pokemon={ctx.opponentPokemon} />
            ) : (
              <div>
                <h2>Opponent Pokemon</h2>
              </div>
            )}
          </div>
        </div>
      </div>{" "}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Button
          onClick={startBattle}
          variant="contained"
          sx={ButtonStyle}
          disabled={ctx.opponentPokemon.length == 0}
        >
          Start Battle
        </Button>
      </div>
    </>
  );
}

export default Lobby;
