import React from "react";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertBox = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert {...props} />
    </div>
  );
};

export default AlertBox;
