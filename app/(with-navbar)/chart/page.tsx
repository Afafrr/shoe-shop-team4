import { Box, Divider, Typography } from "@mui/material";
import ProductsInCart from "./_components/ProductsInCart";

export default function ChartPage() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          m: {
            xs: "13.73px 16.22px 12px 20px",
            sm: "80px auto 155px 196px",
          },
        }}
      >
        <Typography fontWeight={500} fontSize={"30px"}>
          Chart
        </Typography>
      </Box>

      <Divider sx={{ display: { xs: "block", sm: "none" } }} />

      <ProductsInCart />
    </Box>
  );
}
