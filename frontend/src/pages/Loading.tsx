import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Loading({ isOpen }: any) {
  return (
    <div>
      <Backdrop open={isOpen}>
        <CircularProgress
          sx={{
            color: "#DF593A",
          }}
        />
      </Backdrop>
    </div>
  );
}

export default Loading;
