import { Box, CircularProgress, Typography } from "@mui/material";

type LoadingProps = {
  height?: string;
  width?: string;
  backgroundColor?: string;
};
export default function LoadingPage({
  height,
  width,
  backgroundColor = "#f5f5f5",
}: LoadingProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: width || "100%",
        height: height || "100vh",
        backgroundColor,
        textAlign: "center",
      }}
    >
      {/* Loading Spinner */}
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: "#FE645E",
          mb: 3,
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
