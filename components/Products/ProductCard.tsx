import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import React, { ReactNode } from "react";
import shoesPlaceholder from "@public/auth/shoes-log-in.png";

type ProductCardProps = {
  imageUrl: string;
  name: string;
  gender?: string;
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
        minWidth: { xs: "130px", sm: "200px", md: "250px" },
        width: { xs: "45%", sm: "30%", md: "20%" },
        boxShadow: "none",
      }}
    >
      <CardMedia sx={{ height: { xs: "180px", sm: "240px", md: "300px" } }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src={imageUrl || shoesPlaceholder}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
            alt={name}
          />
        </div>
      </CardMedia>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <PrimaryText>{name}</PrimaryText>
          <PrimaryText>${price}</PrimaryText>
        </Box>
        <SecondaryText>
          {gender ? `${gender}'s Shoes` : "Unisex Shoes"}
        </SecondaryText>
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
