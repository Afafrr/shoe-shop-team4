"use client";

import { Box, Typography } from "@mui/material";

interface ProductTitleProps {
  name: string;
  price: number;
}

export default function ProductTitle({ name, price }: ProductTitleProps) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%", padding: "0" }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontSize: { xs: "35px", md: "35px", lg: "46px" },
          lineHeight: "46px",
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
  );
}
