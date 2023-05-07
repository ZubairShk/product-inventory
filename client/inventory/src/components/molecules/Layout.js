import React from "react";
import { Box, styled } from "@mui/material";

import HalfBack from "../../Assets/HalfBack.jpg";

export default function Layout({ children }) {
  return (
    <Box
      //   width="100%"
      //   height="100%"
      style={{
        minWidth: "100wh",
        minHeight: "100vh",
        backgroundImage: `url(${HalfBack})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        overflow: "auto",
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}
