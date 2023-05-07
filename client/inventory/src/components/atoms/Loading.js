import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Loading(props) {
  const { isOpen } = props;
  const classes = useStyles();
  return (
    <>
      <Backdrop className={classes.backdrop} open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Loading;
