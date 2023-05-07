import React from "react";
import { formCardStyles } from "./FormCard.style";
import { Box, Paper } from "@mui/material";

const FormCard = (props) => {
  const { width, children } = props;
  const classes = formCardStyles();
  return (
    <>
      {/* <Box paddingTop={5}> */}
      <Box>
        <Paper elevation={width === "xs" ? 0 : 4} className={classes.root}>
          {children}
        </Paper>
      </Box>
    </>
  );
};

export default FormCard;
