import { CartItem, useCart } from "@/contexts/Cart";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  SnackbarContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProductInfo from "./ProductInfo";
import Link from "next/link";
import NoProductsInfo from "../../_components/NoProductsInfo";
import { useRouter } from "next/navigation";
import { Close } from "@mui/icons-material";
import sortCartItems from "../_lib/sortCartItems";

export default function ChartInfo() {
  const [showMessage, setShowMessage] = useState(false);
  const [eliminatedItem, setEliminatedItem] = useState<CartItem | null>(null);
  const { cartItems, addItem } = useCart();
  const router = useRouter();

  const sortedCartItems = sortCartItems(cartItems);

  function handleUndoDelete() {
    if (eliminatedItem) {
      addItem(eliminatedItem);
    }
    setShowMessage(false);
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowMessage(false);
  };

  const action = (
    <>
      <Button onClick={handleUndoDelete}>UNDO</Button>
      <IconButton aria-label="close" onClick={handleClose}>
        <Close fontSize="small" />
      </IconButton>
    </>
  );
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
            Cart
          </Typography>
        </Box>
        <Divider sx={{ display: { xs: "block", md: "none" } }} />
        {sortedCartItems.length > 0 ? (
          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              minHeight: "60vh",
              mx: "12px",
              [theme.breakpoints.up("md")]: {
                height: "100%",
                flex: 1,
                m: "13.73px 16.22px 12px 20px",
              },
            })}
          >
            {cartItems.map((item) => (
              <ProductInfo
                key={item.id}
                item={item}
                showMessage={() => setShowMessage(true)}
                setEliminatedItem={(item: CartItem) => setEliminatedItem(item)}
              />
            ))}
            <Button
              variant="text"
              href="/products"
              LinkComponent={Link}
              sx={{
                mt: "12px",
                mx: "auto",
                borderRadius: "8px",
                minWidth: { xs: "240px", lg: "320px" },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <NoProductsInfo
            title="You don’t have any products yet"
            subtitle=""
            onBtnClick={() => router.push("/")}
          />
        )}
      </Box>
      <Snackbar
        open={showMessage}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: "white",
          }}
          message={<Typography color="textPrimary">Product Removed</Typography>}
          action={action}
        />
      </Snackbar>
    </>
  );
}
