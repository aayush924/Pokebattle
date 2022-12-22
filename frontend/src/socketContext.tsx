import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";

export const SocketContext = createContext<any>();

export const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
