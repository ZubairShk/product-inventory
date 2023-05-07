import { makeStyles } from "@mui/styles";

export const DashboardStyles = makeStyles((theme) => ({
  delIcon: {
    "&:hover ": {
      color: "red",
    },
  },
  editIcon: {
    "&:hover ": {
      color: "orange",
    },
  },
  imgBtn: {
    fontSize: "0.7rem",
  },
  addBtn: {
    color: "#FFFFFF",
    background: "#008000",
    width: "10rem",
    height: "2.5rem",
  },
  table: {
    minWidth: 100,
    maxWidth: 200,
    height: "100%",
  },
}));
