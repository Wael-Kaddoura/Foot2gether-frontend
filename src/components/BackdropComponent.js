import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function BackdropComponent(props) {
  const { open } = props;

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff !important",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default BackdropComponent;
