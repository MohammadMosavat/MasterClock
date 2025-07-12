import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009c1a",
      light: "#22b600",
    },
    secondary: {
      main: "#26cc00",
      light: "#e2ffdc",
    },
    background: {
      default: "#d2f2d4",
      paper: "#e2ffdc",
    },
    text: {
      primary: "#009c1a",
      secondary: "#26cc00",
    },
  },
});
export default theme;
