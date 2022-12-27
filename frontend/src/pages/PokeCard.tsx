import Chip from "@mui/material/Chip";

function PokeCard({ pokemon }: any) {
  return (
    <div className="card_details">
      <div className="card_img">
        <img
          src={pokemon.sprites.front_default}
          style={{
            width: "120px",
          }}
        />
      </div>
      <div className="card_data">
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            gap: "10px",
        }}>
          <div className="card_details_name">{pokemon.name}</div>
          <div className="card_details_type">
            {pokemon.types.map((type: any) => (
              <Chip
                label={type.type.name}
                sx={{
                  backgroundColor: "#DF593A",
                  color: "white",
                  margin: "2px",
                  fontSize: "15px",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#DF593A",
                    color: "white",
                  },
                }}
                clickable
              />
            ))}
          </div>
        </div>
        <div className="card_details_stats">
          {/* create table for 6 items 3 columns 2 row */}
          <table className="table">
            <tr>
              <td className="table_item">HP</td>
              <td className="table_item">Attack</td>
              <td className="table_item">Defense</td>
            </tr>
            <tr>
              <td>{pokemon.stats[0].base_stat}</td>
              <td>{pokemon.stats[1].base_stat}</td>
              <td>{pokemon.stats[2].base_stat}</td>
            </tr>
            <tr>
              <td className="table_item">Sp. Attack</td>
              <td className="table_item">Sp. Defense</td>
              <td className="table_item">Speed</td>
            </tr>
            <tr>
              <td>{pokemon.stats[3].base_stat}</td>
              <td>{pokemon.stats[4].base_stat}</td>
              <td>{pokemon.stats[5].base_stat}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PokeCard;

// name
// type
// stats
