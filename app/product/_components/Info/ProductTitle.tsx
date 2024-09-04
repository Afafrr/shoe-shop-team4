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
      sx={{ width: "100%", padding: "0 16px" }}
    >
      <Typography variant="h4" component="h1">
        {name}
      </Typography>
      <Typography variant="h5" component="strong">
        ${price}
      </Typography>
    </Box>
  );
}
