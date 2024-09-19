"use client";

import { Button, Box } from "@mui/material";

type ErrorButtonProps = {
  onGoBack: () => void;
  onHome: () => void;
};

export default function ErrorButtons({ onGoBack, onHome }: ErrorButtonProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: "16px", mt: 2 }}>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          width: "152px",
          height: "40px",
          borderColor: "primary.main",
          color: "primary.main",
          borderRadius: "10px",
        }}
        onClick={onGoBack}
      >
        Go Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "152px",
          height: "40px",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          borderRadius: "10px",
        }}
        onClick={onHome}
      >
        Home
      </Button>
    </Box>
  );
}
