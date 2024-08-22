'use client';
import { createTheme } from '@mui/material/styles';
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
  });

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: workSans.style.fontFamily,
  },
});

export default theme;