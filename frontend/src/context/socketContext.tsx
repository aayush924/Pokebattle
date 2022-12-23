import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";

export const SocketContext = createContext<any>();

const initialState = {
  socket: null,
  roomName: "",
  userPokemon: [],
  opponentPokemon: [],
  userPokemonHealth: 0,
  opponentPokemonHealth: 0,
  userPokemonCount: 0,
  opponentPokemonCount: 0,
  setRoomId: (roomId: string) => {},
};

export const SocketProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSocket = () => {
    dispatch({ type: "SET_SOCKET", payload: {} });
  };

  const roomHandler = (roomId: string) => {
    dispatch({ type: "SET_ROOM_NAME", payload: roomId });
  }

  
  


  const ctx = {
    socket: state.socket,
    roomName: state.roomName,
    userPokemon: state.userPokemon,
    opponentPokemon: state.opponentPokemon,
    userPokemonHealth: state.userPokemonHealth,
    opponentPokemonHealth: state.opponentPokemonHealth,
    userPokemonCount: state.userPokemonCount,
    opponentPokemonCount: state.opponentPokemonCount,
    setRoomId: roomHandler
  }

  useEffect(() => {
    setSocket();
  }, []);
  return (
    <SocketContext.Provider value={{ ctx, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};
