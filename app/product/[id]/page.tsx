"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import useProductDetails from "@/app/hooks/useProductDetails";
import ProductInfo from "@/app/product/_components/Info/ProductInfo";
import ProductImageGallery from "@/app/product/_components/gallery/ProductImageGallery";
import SizeSelector from "@/app/product/_components/actions/SizeSelector";
import ActionButtons from "@/app/product/_components/actions/ActionButtons";
import ProductDescription from "@/app/product/_components/Info/ProductDescription";
import ProductTitle from "../_components/Info/ProductTitle";
// import RelatedProducts from "@/app/product/_components/RelatedProducts";

type SizeAPIResponse = {
  id: number;
  attributes: {
    value: number;
  };
};

type SizesAPIResponse = {
  data: SizeAPIResponse[];
};

const queryClient = new QueryClient();

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, error, isLoading } = useProductDetails(id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + (error as Error).message;

  if (!data) return null;

  const { name, price, subtitle, description, images, sizes, categories } =
    data.attributes;

  const mappedSizes =
    (sizes as SizesAPIResponse)?.data?.map((size: SizeAPIResponse) => ({
      id: size.id,
      attributes: {
        value: size.attributes.value,
      },
    })) || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: 2,
        // padding: { xs: 2, md: 4 },
      }}
    >
      <ProductImageGallery images={images} />
      <ProductTitle name={name} price={price} />
      {/* <ProductInfo
        name={name}
        price={price}
        subtitle={subtitle}
        categories={categories}
      /> */}
      <SizeSelector sizes={mappedSizes} />
      <ActionButtons />
      <ProductDescription description={description} />
      {/* <RelatedProducts categories={categories} /> */}
    </Box>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPage params={params} />
    </QueryClientProvider>
  );
}
