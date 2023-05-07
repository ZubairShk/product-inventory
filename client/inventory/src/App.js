import "./App.css";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FormPage from "./Pages/FormPage";
import Dashboard from "./Pages/Dashboard";
let theme = createTheme({
  palette: {
    primary: { main: "#007ae7" },
    secondary: { main: "#F27807" },
  },
  typography: {
    fontFamily: ['"Noto Sans"', "sans-serif"].join(","),
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: ".7em",
        },
        "*::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 5px grey",
          webkitBoxShadow: "inset 0 0 5px grey",
          borderRadius: 10,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      root: {
        fontSize: 16,
        fontWeight: "bold",
      },
      containedPrimary: {
        borderRadius: 16,
        border: "solid 1px #007ae7",
      },
      outlinedPrimary: {
        borderRadius: 16,
        border: "solid 2px #007ae7",
        "&:hover": {
          border: "solid 2px #007ae7",
        },
      },
    },
    MuiTextField: {
      root: {
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderRadius: 8,
            // height: 56,
          },
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 5,
        boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
      },
    },
    MuiFormLabel: {
      asterisk: {
        color: "#f93d5c",
        "&$error": {
          color: "#f93d5c",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/addNew" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
