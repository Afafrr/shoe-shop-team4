import { Box } from "@mui/material";
import React from "react";
import Stripe from "stripe";
import OrderStatus from "./OrderStatus";
import { BoldTypography, SecondaryTypography } from "../ui/CustomTypographies";
import InfoBox from "../ui/InfoBox";

type OrderSummaryProps = {
  id: string;
  created: number;
  productsQty: number;
  amount: number;
  status: Stripe.PaymentIntent.Status;
};

export default function OrderSummary({
  id,
  created,
  productsQty,
  amount,
  status,
}: OrderSummaryProps) {
  const date = new Date(created * 1000)
    .toLocaleDateString()
    .replaceAll("/", ".");

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          maxWidth: "25%",
          alignItems: "center",
        }}
      >
        <BoldTypography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {id.slice(3)}
        </BoldTypography>
        <SecondaryTypography>{date}</SecondaryTypography>
      </Box>

      <InfoBox label="Products " value={productsQty.toString()} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <InfoBox
          label="Summary:"
          value={`${amount / 100}$`}
          highlightValue={true}
        />
        <OrderStatus status={status} />
      </Box>
    </Box>
  );
}
