"use client";
import { Box, Divider, Typography } from "@mui/material";

import { useCart } from "@/contexts/Cart";
import ProductInfo from "./ProductInfo";
import NoProductsInfo from "../../_components/NoProductsInfo";
import { useRouter } from "next/navigation";
import SummaryInfo from "./SummaryInfo";

export default function ProductsInCart() {
  const { cartItems } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce((acc, item) => {
    return (acc += item.price * item.quantity);
  }, 0);

  return (
    <>
      <Box flexGrow={1}>
        <Box
          sx={{
            m: {
              xs: "13.73px 16.22px 12px 20px",
              md: "80px auto 50px 50px",
            },
          }}
        >
          <Typography fontWeight={500} fontSize={"30px"}>
            Chart
          </Typography>
        </Box>
        <Divider sx={{ display: { xs: "block", md: "none" } }} />
        {cartItems.length > 0 ? (
          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              mx: "12px",
              [theme.breakpoints.up("md")]: {
                height: "100%",
                flex: 1,
                m: "13.73px 16.22px 12px 20px",
              },
            })}
          >
            {cartItems.map((item) => (
              <ProductInfo key={item.id} item={item} />
            ))}
          </Box>
        ) : (
          <NoProductsInfo
            title="You don’t have any products yet"
            subtitle=""
            onBtnClick={() => router.push("/")}
          />
        )}
      </Box>

      {cartItems.length > 0 && <SummaryInfo subtotal={subtotal} />}
    </>
  );
}
