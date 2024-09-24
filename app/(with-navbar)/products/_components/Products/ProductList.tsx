import LoadingPage from "@/components/Loading/LoadingPage";
import ProductCard from "@/components/Products/ProductCard";
import { FiltersType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { extractProductInfo, getProductsForCards } from "../../_lib/utils";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { ProductOverlay } from "./ProductOverlay";
import ProductContainer from "@/components/Products/ProductContainer";

type ProductListProps = {
  setShoesCount: (num: number) => void;
  filters: FiltersType;
};

export default function ProductList({
  setShoesCount,
  filters,
}: ProductListProps) {
  const router = useRouter();

  const { data, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProductsForCards(filters),
    select: (data) => data.data,
  });

  useEffect(() => {
    if (data) {
      setShoesCount(data.length);
    }
  }, [data, setShoesCount]);

  if (error) throw new Error("Something went wrong");

  const productInfo = extractProductInfo(data);

  return (
    <Suspense fallback={<LoadingPage backgroundColor="#FFFFFF" />}>
      <Grid container>
        {productInfo.map((product) => (
          <ProductContainer key={product.id}>
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
              <ProductOverlay
                redirect={() => router.push(`/products/${product.id}`)}
              />
            </Box>
          </ProductContainer>
        ))}
      </Grid>
    </Suspense>
  );
}
