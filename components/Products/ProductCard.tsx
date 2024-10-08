import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { ReactNode } from "react";
import noImage from "@public/product/NoProductImage.png";
type ProductCardProps = {
  imageUrl: string;
  name: string;
  gender?: string;
  price: number;
  children?: ReactNode;
};

export default function ProductCard({
  imageUrl,
  name,
  gender,
  price,
  children,
}: ProductCardProps) {
  return (
    <Card
      sx={{
        width: "80%",
        mx: "auto",
        boxShadow: "none",
      }}
    >
      <CardMedia
        sx={{ height: { xs: "180px", sm: "240px", md: "280px", xl: "300px" } }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src={imageUrl || noImage}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
            alt={name}
          />
          {children}
        </div>
      </CardMedia>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <PrimaryText breakWord>{name}</PrimaryText>
          <PrimaryText>${price}</PrimaryText>
        </Box>
        <SecondaryText>
          {gender ? `${gender}'s Shoes` : "Unisex Shoes"}
        </SecondaryText>
      </CardContent>
    </Card>
  );
}

interface PrimaryTextProps {
  children: ReactNode;
  breakWord?: boolean;
}

function PrimaryText({ children, breakWord = false }: PrimaryTextProps) {
  return (
    <Typography
      sx={{
        fontSize: { xs: "10px", md: "22px" },
        fontWeight: 500,
        wordBreak: breakWord ? "break-word" : "normal",
      }}
    >
      {children}
    </Typography>
  );
}

function SecondaryText({ children }: { children: ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: { xs: "9px", md: "18px" },
        fontWeight: 500,
        color: "#5c5c5c",
      }}
    >
      {children}
    </Typography>
  );
}
