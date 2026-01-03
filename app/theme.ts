import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E0B1CB", // same as light mode
      light: "#f4d7e5",
      dark: "#c08aa0",
      contrastText: "#231942", // better contrast on dark background
    },
    secondary: {
      main: "#231942",
      light: "#3b2a63",
      dark: "#1b1030",
      contrastText: "#fff",
    },
    background: {
      default: "#121212", // dark background
      paper: "#1e1e1e", // slightly lighter for cards/panels
    },
    text: {
      primary: "#f4d7e5", // light text for readability
      secondary: "#cdb4db", // softer secondary text
    },
    error: {
      main: red[600],
    },
  },
  typography: {
    // Default body font
    fontFamily: `"Clash Grotesk", sans-serif`,
    // Headings (h1-h6)
    h1: { fontFamily: `"Clash Display", sans-serif` },
    h2: { fontFamily: `"Clash Display", sans-serif` },
    h3: { fontFamily: `"Clash Display", sans-serif` },
    h4: { fontFamily: `"Clash Display", sans-serif` },
    h5: { fontFamily: `"Clash Display", sans-serif` },
    h6: { fontFamily: `"Clash Display", sans-serif` },
    // Buttons
    button: { fontFamily: `"Clash Grotesk", sans-serif` },
    // Subtitles and captions
    subtitle1: { fontFamily: `"Clash Grotesk", sans-serif` },
    subtitle2: { fontFamily: `"Clash Grotesk", sans-serif` },
    body1: { fontFamily: `"Clash Grotesk", sans-serif` },
    body2: { fontFamily: `"Clash Grotesk", sans-serif` },
    caption: { fontFamily: `"Clash Grotesk", sans-serif` },
    overline: { fontFamily: `"Clash Grotesk", sans-serif` },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "6px 16px",
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 3px 10px rgba(0,0,0,0.6)", // darker shadow for dark mode
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "#1e1e1e", // dark appbar
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default darkTheme;
