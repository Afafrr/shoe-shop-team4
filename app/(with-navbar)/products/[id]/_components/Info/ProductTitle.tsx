"use client";

import { Box, Typography } from "@mui/material";

interface ProductTitleProps {
  name: string;
  price: number;
  gender: string;
}

export default function ProductTitle({ name, price, gender }: ProductTitleProps) {
  return (
    <Box sx={{ width: "100%", padding: "0" }}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: { xs: "35px", md: "35px", lg: "46px" },

            fontWeight: "500",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontSize: { xs: "18px", md: "18px", lg: "22px" },

            fontWeight: "500",
          }}
        >
          ${price}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        component="p"
        sx={{
          fontSize: { xs: "14px", md: "16px", lg: "18px" },
          color: "#494949",
          marginTop: "8px",
        }}
      >
        {gender}
      </Typography>
    </Box>
  );
}
