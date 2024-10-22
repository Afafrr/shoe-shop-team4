import { Box, Typography } from "@mui/material";
import React from "react";
import { BoldTypography, SecondaryTypography } from "../ui/CustomTypographies";
import Image from "next/image";
import InfoBox from "../ui/InfoBox";

type ProductDetailItemProps = {
  product: {
    size: number;
    quantity: number;
    id: number;
    name: string;
    price: number;
    gender: string;
    imageUrl: string | null;
  };
};

export default function ProductDetailItem({ product }: ProductDetailItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        py: "16px",
        px: "24px",
        gap: "24px",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          width: { xs: "100%", sm: "50%", lg: "70%" },
        }}
      >
        <Box
          sx={{
            minWidth: "104px",
            minHeight: "104px",
            width: "104px",
            height: "104px",
          }}
        >
          <Image
            src={product.imageUrl || ""}
            alt={product.name}
            width={104}
            height={104}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100px", sm: "200px", md: "300px", lg: "600px" },
            }}
          >
            <Typography
              fontWeight={500}
              fontSize="24px"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              color={"textPrimary"}
            >
              {product.name}
            </Typography>
            <SecondaryTypography sx={{ fontWeight: 500, fontSize: "16px" }}>
              {product.gender ? `${product.gender}'s Shoes` : "Unisex Shoes"}
            </SecondaryTypography>
          </Box>

          <Box display="flex" alignItems="center">
            <BoldTypography sx={{ fontWeight: 500 }}>
              Size: {`EU-${product.size}`}
            </BoldTypography>
          </Box>
        </Box>
      </Box>

      <InfoBox label="Quantity:" value={product.quantity.toString()} />

      <InfoBox label="Price:" value={`${product.price}$`} highlightValue />
    </Box>
  );
}
