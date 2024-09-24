import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingPage({
  backgroundColor = "#f5f5f5",
  height = "100vh",
}: {
  backgroundColor?: string;
  height?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: height,
        backgroundColor,
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
