import { Box, Divider, Stack, Typography } from "@mui/material";
import ProductsInCart from "./_components/ProductsInCart";

export default function ChartPage() {
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <ProductsInCart />
    </Stack>
  );
}
