"use client";

import Link from "next/link";

import { Box, Button, SvgIcon, Typography } from "@mui/material";

import { useCart } from "@/contexts/Cart";
import ProductInfo from "./ProductInfo";

export default function ProductsInCart() {
  const { cartItems } = useCart();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {cartItems.length > 0 ? (
        <Box
          sx={(theme) => ({
            scrollSnapType: "y mandatory",
            overflow: "auto",
            height: "100vh",
            [theme.breakpoints.up("sm")]: {
              height: "100%",
              width: "100%",
              scrollSnapType: "none",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              scrollSnapAlign: "start",
              height: "100vh",
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                scrollSnapAlign: "none",
                height: "100%",
                flex: 1,
              },
            })}
          >
            {cartItems.map((item) => (
              <ProductInfo key={item.id} item={item} />
            ))}
          </Box>

          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              width: "100%",
              scrollSnapAlign: "start",
              height: "100vh",
              [theme.breakpoints.up("sm")]: {
                scrollSnapAlign: "none",
                height: "100%",
                flex: 1,
              },
            })}
          >
            <Typography fontWeight={500} fontSize={"30px"}>
              Summary
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            gap: "10px",
            mt: {
              xs: "150px",
              sm: "50px",
            },
          }}
        >
          <SvgIcon sx={{ width: 72, height: 72 }}>
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="72" height="72" rx="36" fill="#F9FAFB" />
              <path
                d="M30.3251 31.3169C30.1667 31.3169 30.0001 31.2502 29.8834 31.1335C29.6417 30.8919 29.6417 30.4919 29.8834 30.2502L32.9084 27.2252C33.1501 26.9835 33.5501 26.9835 33.7917 27.2252C34.0334 27.4669 34.0334 27.8669 33.7917 28.1085L30.7667 31.1335C30.6417 31.2502 30.4834 31.3169 30.3251 31.3169Z"
                fill="#6E7378"
              />
              <path
                d="M41.6748 31.3169C41.5164 31.3169 41.3581 31.2585 41.2331 31.1335L38.2081 28.1085C37.9664 27.8669 37.9664 27.4669 38.2081 27.2252C38.4498 26.9835 38.8498 26.9835 39.0914 27.2252L42.1164 30.2502C42.3581 30.4919 42.3581 30.8919 42.1164 31.1335C41.9998 31.2502 41.8331 31.3169 41.6748 31.3169Z"
                fill="#6E7378"
              />
              <path
                d="M42.8415 34.8333C42.7832 34.8333 42.7248 34.8333 42.6665 34.8333H42.4748H29.3332C28.7498 34.8417 28.0832 34.8417 27.5998 34.3583C27.2165 33.9833 27.0415 33.4 27.0415 32.5417C27.0415 30.25 28.7165 30.25 29.5165 30.25H42.4832C43.2832 30.25 44.9582 30.25 44.9582 32.5417C44.9582 33.4083 44.7832 33.9833 44.3998 34.3583C43.9665 34.7917 43.3832 34.8333 42.8415 34.8333ZM29.5165 33.5833H42.6748C43.0498 33.5917 43.3998 33.5917 43.5165 33.475C43.5748 33.4167 43.6998 33.2167 43.6998 32.5417C43.6998 31.6 43.4665 31.5 42.4748 31.5H29.5165C28.5248 31.5 28.2915 31.6 28.2915 32.5417C28.2915 33.2167 28.4248 33.4167 28.4748 33.475C28.5915 33.5833 28.9498 33.5833 29.3165 33.5833H29.5165Z"
                fill="#6E7378"
              />
              <path
                d="M38.4083 44.9581H33.3833C30.4 44.9581 29.7333 43.1831 29.475 41.6415L28.3 34.4331C28.2416 34.0915 28.475 33.7748 28.8166 33.7165C29.15 33.6581 29.475 33.8915 29.5333 34.2331L30.7083 41.4331C30.95 42.9081 31.45 43.7081 33.3833 43.7081H38.4083C40.55 43.7081 40.7916 42.9581 41.0666 41.5081L42.4666 34.2165C42.5333 33.8748 42.8583 33.6498 43.2 33.7248C43.5416 33.7915 43.7583 34.1165 43.6916 34.4581L42.2916 41.7498C41.9666 43.4415 41.425 44.9581 38.4083 44.9581Z"
                fill="#6E7378"
              />
            </svg>
          </SvgIcon>

          <Typography fontWeight={500} fontSize={"20px"}>
            You don’t have any products yet
          </Typography>

          <Link href="/">
            <Button
              sx={{
                mt: "24px",
                width: "152px",
                borderRadius: "8px",
                backgroundColor: "#FE645E",
                color: "white",
                height: "40px",
                fontWeight: 500,
                fontSize: "16px",
                textTransform: "none",
                ":hover": {
                  backgroundColor: "#FE645E",
                },
              }}
            >
              Add Product
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}
