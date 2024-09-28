import ProductsInCart from "./_components/ProductsInCart";
import { Stack } from "@mui/material";

export default function ChartPage() {
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        maxWidth: "1440px",
        mx: "auto",
      }}
    >
      <ProductsInCart />
    </Stack>
  );
}
