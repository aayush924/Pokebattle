import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
  return (
    <div className="card">
      <p
        style={{
          fontSize: "20px",
          fontFamily: "Poppins",
          fontWeight: "bold",
        }}
      >
        Fetching Pokemon
      </p>
      <CircularProgress
        sx={{
          color: "#DF593A",
        }}
      />
    </div>
  );
}

export default Loading;
