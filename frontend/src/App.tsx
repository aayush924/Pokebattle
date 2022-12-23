import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Room from "./pages/Room";
import { SocketProvider } from "./context/socketContext";

function App() {
  return (
    <>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </>
  );
}

export default App;
