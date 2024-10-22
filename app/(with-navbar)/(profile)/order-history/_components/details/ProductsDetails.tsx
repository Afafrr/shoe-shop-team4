import { ProductFromOrder } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { getProductInfo, getProductsForOrders } from "../../_lib/utils";
import errorToast from "@/components/Alerts/errorToast";
import { Box, Stack } from "@mui/material";
import ProductDetailItem from "./ProductDetailItem";
import ProductDetailItemSkeleton from "./ProductDetailItemSkeleton";

type ProductsDetailsProps = {
  products: ProductFromOrder[];
};

export default function ProductsDetails({ products }: ProductsDetailsProps) {
  const productsIds = products.map((product) => String(product.id));

  const { data, error, isLoading } = useQuery({
    queryKey: ["productsForCard", productsIds],
    queryFn: () => getProductsForOrders(productsIds),
  });

  if (error) {
    errorToast("Something went wrong getting your details");
  }

  if (isLoading) {
    return Array.from({ length: products.length }).map((_, index) => (
      <ProductDetailItemSkeleton key={index} />
    ));
  }

  const detailedOrderProducts = data?.data.map((product) => {
    const orderProduct = products.find((p) => p.id === product.id)!;
    return {
      ...getProductInfo(product),
      size: orderProduct?.size,
      quantity: orderProduct?.quantity,
    };
  });

  return (
    <Stack gap={2}>
      {detailedOrderProducts ? (
        detailedOrderProducts.map((product) => (
          <ProductDetailItem key={product.id} product={product} />
        ))
      ) : (
        <Box display="flex" justifyContent="center" py="16px">
          We could not find your product details
        </Box>
      )}
    </Stack>
  );
}
