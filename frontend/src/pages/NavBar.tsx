import { useState } from "react";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import "../App.css";

function NavBar({ isRoom }: any) {
  const [copied, setCopied] = useState(false);

  const clickHandler = () => {
    navigator.clipboard.writeText(isRoom);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="navbar">
      <p className="nav_title">
        <CatchingPokemonIcon />
        Pokebattle
      </p>
      {isRoom ? (
        <p onClick={clickHandler} className="nav_room">
          {copied ? "Copied!" : <span>Room Id: {isRoom}</span>}
        </p>
      ) : null}
    </div>
  );
}

export default NavBar;
