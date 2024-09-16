import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import React, { ReactNode } from "react";

type ProductCardProps = {
  imageUrl: string;
  name: string;
  gender: string;
  price: number;
};

export default function ProductCard({
  imageUrl,
  name,
  gender,
  price,
}: ProductCardProps) {
  return (
    <Card
      sx={{
        maxWidth: { xs: "152px", md: "320px" },
        boxShadow: "none",
      }}
    >
      <CardMedia sx={{ height: { xs: "180px", md: "380px" } }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src={imageUrl}
            fill
            style={{ objectFit: "contain" }}
            alt={name}
          />
        </div>
      </CardMedia>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <PrimaryText>{name}</PrimaryText>
          <PrimaryText>${price}</PrimaryText>
        </Box>
        <SecondaryText>{`${gender}'s Shoes`}</SecondaryText>
      </CardContent>
    </Card>
  );
}

function PrimaryText({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ fontSize: { xs: "10px", md: "22px" }, fontWeight: 500 }}>
      {children}
    </Typography>
  );
}

function SecondaryText({ children }: { children: ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: { xs: "10px", md: "22px" },
        fontWeight: 500,
        color: "#5c5c5c",
      }}
    >
      {children}
    </Typography>
  );
}
