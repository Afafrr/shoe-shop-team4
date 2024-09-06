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
        alignItems: { xs: "center", md: "flex-start" },
        justifyContent: "space-between",

        width: "100%",
        paddingTop: { md: "100px" },
        paddingLeft: { md: "300px" },
        paddingRight: { md: "300px" },
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <ProductImageGallery images={images} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { xs: "100%", md: "50%" },
          paddingLeft: { md: 4 }, // Añade espacio entre la imagen y el contenido en escritorio
        }}
      >
        <ProductTitle name={name} price={price} />
        <SizeSelector sizes={mappedSizes} />
        <ActionButtons />
        <ProductDescription description={description} />
      </Box>
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
