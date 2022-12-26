import { io } from "socket.io-client";

export type State = {
  socket: any;
  roomName: string;
  userPokemon: any[];
  opponentPokemon: any[];
  userPokemonCount: number;
  opponentPokemonCount: number;
  userPokemonHealth: number;
  opponentPokemonHealth: number;
};

export type Action =
  | { type: "SET_SOCKET"; payload: any }
  | { type: "SET_ROOM_NAME"; payload: string }
  | { type: "SET_USER_POKEMON"; payload: any }
  | { type: "SET_OPPONENT_POKEMON"; payload: any }
  | { type: "SET_USER_POKEMON_COUNT"; payload: any }
  | { type: "SET_OPPONENT_POKEMON_COUNT"; payload: any }
  | { type: "SET_USER_POKEMON_HEALTH"; payload: any }
  | { type: "SET_OPPONENT_POKEMON_HEALTH"; payload: any };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SOCKET":
      const socket = io("http://localhost:8000");
      // window.sessionStorage.setItem("socket", "true");
      return { ...state, socket: socket };
    case "SET_ROOM_NAME":
      return { ...state, roomName: action.payload };
    case "SET_USER_POKEMON":
      // also set userPokemonCount and userPokemonHealth
      let pokemon = action.payload;
      // const pokemonCount = pokemon.length;
      return { ...state, userPokemon: pokemon };
    case "SET_OPPONENT_POKEMON":
      // also set opponentPokemonCount and opponentPokemonHealth
      let opokemon = action.payload;
      // const opokemonCount = opokemon.length;
      return { ...state, opponentPokemon: opokemon };
    case "SET_USER_POKEMON_HEALTH":
      return { ...state, userPokemonHealth: action.payload };
    case "SET_OPPONENT_POKEMON_HEALTH":
      return { ...state, opponentPokemonHealth: action.payload };
    case "SET_USER_POKEMON_COUNT":
      return { ...state, userPokemonCount: action.payload };
    case "SET_OPPONENT_POKEMON_COUNT":
      return { ...state, opponentPokemonCount: action.payload };
    default:
      return state;
  }
};
