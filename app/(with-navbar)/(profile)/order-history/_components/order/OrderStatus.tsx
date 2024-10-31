import { Check, Close, Pending } from "@mui/icons-material";
import { SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
import Stripe from "stripe";

type OrderStatusProps = {
  status: Stripe.PaymentIntent.Status;
};

export default function OrderStatus({ status }: OrderStatusProps) {
  switch (status) {
    case "succeeded":
      return orderStatusDisplay("Received", "green", Check);
    case "canceled":
      return orderStatusDisplay("Cancelled", "red", Close);
    default:
      return orderStatusDisplay("Pending", "textSecondary", Pending);
  }
}

function orderStatusDisplay(
  message: string,
  color: string,
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
) {
  return (
    <Typography
      fontSize="14px"
      color={color}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Icon sx={{ marginRight: 1, color }} />
      {message}
    </Typography>
  );
}
