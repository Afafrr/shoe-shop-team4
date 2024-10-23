"use client";
import { useCart } from "@/contexts/Cart";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import deliveryImage from "@/public/checkout/success-image.png";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";

export default function Page() {
  const { clearCart } = useCart();
  const params = useSearchParams();
  const { push } = useRouter();
  const { palette, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("lg"));

  useEffect(() => {
    clearCart();
  }, []);

  const paymentId = params.get("payment_intent");
  const orderNumber = paymentId?.split("_")[1];
  const orderIdParam = new URLSearchParams();
  orderIdParam.append("orderId", orderNumber || "");

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "1440px",
        mt: { xs: "30px", md: "80px" },
        mb: { xs: "50px", md: "80px" },
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: "clamp(80px, calc(3em + 10vw), 140px)",
              md: "140px",
            },
            fontWeight: 900,
            lineHeight: { xs: "calc(50px + 8vw)", md: "130px" },
            textTransform: "uppercase",
          }}
        >
          Thank you
        </Typography>
        <Box
          sx={{
            fontSize: { xs: "35px", md: "48px" },
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: "50px",
          }}
        >
          for your order
          <Box
            sx={{
              color: palette.primary.main,
              fontWeight: 500,
              fontStyle: "normal",
              wordBreak: "break-word",
            }}
          >
            #{orderNumber}
          </Box>
        </Box>
        <Typography
          variant="h5"
          sx={{
            mt: { xs: "40px", md: "77px" },
            maxWidth: "50ch",
            color: palette.text.secondary,
            fontWeight: 300,
          }}
        >
          Your order has been received and is currently being processed. You
          will receive an email confirmation with your order details shortly.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: { xs: "16px", md: "30px" },
            justifyContent: "space-between",
            width: "100%",
            height: "61px",
            maxWidth: "592px",
            mt: { xs: "60px", md: "77px" },
          }}
        >
          <Button
            variant="outlined"
            onClick={() => push(`/order-history/?${orderIdParam}`)}
            sx={{ width: "100%", height: "100%" }}
          >
            View Order
          </Button>
          <Button
            variant="contained"
            onClick={() => push("/products")}
            sx={{ width: "100%", height: "100%" }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
      {!isMobile ? (
        <Box
          sx={{
            alignSelf: "flex-end",
            maxWidth: "490px",
            maxHeight: "450px",
            width: "100%",
            height: "100%",
            pl: "100px",
          }}
        >
          <Image
            src={deliveryImage}
            alt="delivery man image"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      ) : null}
    </Container>
  );
}
