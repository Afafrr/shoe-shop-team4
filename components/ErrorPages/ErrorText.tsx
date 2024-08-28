"use client";

import { Typography, Box } from "@mui/material";

type ErrorTextProps = {
  title: string;
  message: string;
};

export default function ErrorText({ title, message }: ErrorTextProps) {
  return (
    <Box>
      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontSize: { xs: "30px", md: "45px" }, fontWeight: 500 }}
      >
        {title}
      </Typography>
      <Box sx={{ maxWidth: "538px", mx: "auto" }}>
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
