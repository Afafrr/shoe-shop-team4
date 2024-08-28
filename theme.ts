"use client";
import { createTheme } from "@mui/material/styles";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FE645E",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FE645E",
    },
  },
  typography: {
    fontFamily: workSans.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorInherit: {
          backgroundColor: "FFFFFF",
          boxShadow: "none",
          borderBottom: "1px solid #EAECF0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
