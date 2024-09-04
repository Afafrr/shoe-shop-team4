"use client";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#f5f5f5", // Light background color
        textAlign: "center",
      }}
    >
      {/* Loading Spinner */}
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: "#FE645E", // Primary color
          mb: 3, // Margin bottom
        }}
      />

      {/* Loading Text */}
      <Typography
        variant="h5"
        component="div"
        color="textPrimary"
        fontWeight={500}
      >
        Loading...
      </Typography>
    </Box>
  );
}
