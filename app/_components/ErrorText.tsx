"use client";

import { Typography, Box } from "@mui/material";

type ErrorTextProps = {
  title: string;
  message: string;
};

export default function ErrorText({ title, message }: ErrorTextProps) {
  return (
    <Box>
      <Box
        sx={{
          maxWidth: "538px",
          mx: { xs: "auto", md: 0 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontSize: { xs: "30px", md: "45px" }, fontWeight: 500 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "12px", md: "20px" },
            fontWeight: 500,
            color: "text.secondary",
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
}
