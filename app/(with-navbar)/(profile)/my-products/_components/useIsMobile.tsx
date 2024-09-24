"use client";
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

// Custom Hook to detect mobile view
export default function useIsMobile(breakpoint: Breakpoint = "md") {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
}
