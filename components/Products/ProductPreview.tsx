"use client";
import { Box } from "@mui/material";
import ProductCard, { ProductCardProps } from "./ProductCard";
import { ProductOverlay } from "./ProductOverlay";
import { useRouter } from "next/navigation";

export type ProductPreviewType = ProductCardProps & {
  id: number;
};

type ProductPreviewProps = {
  product: ProductPreviewType;
};

export default function ProductPreview({ product }: ProductPreviewProps) {
  const router = useRouter();
  return (
    <Box
      position="relative"
      sx={{
        "&:hover .hoverOverlay": {
          opacity: 0.75,
        },
      }}
    >
      <ProductCard
        key={product.id}
        imageUrl={product.imageUrl || ""}
        name={product.name}
        gender={product.gender}
        price={product.price}
      />
      <ProductOverlay redirect={() => router.push(`/products/${product.id}`)} />
    </Box>
  );
}
