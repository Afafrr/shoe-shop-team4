"use client";

//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import LoadingPage from "@/components/Loading/LoadingPage";
import ProductDetails, { PopulateField } from "@/utils/api/singleProduct";
//import useProductDetails from "@/app/(with-navbar)/products/[id]/hooks/useProductDetails";
  
import ProductImageGallery from "@/app/(with-navbar)/products/[id]/_components/gallery/ProductImageGallery";
import SizeSelector from "@/app/(with-navbar)/products/[id]/_components/actions/SizeSelector";
import ActionButtons from "@/app/(with-navbar)/products/[id]/_components/actions/ActionButtons";
import ProductDescription from "@/app/(with-navbar)/products/[id]/_components/Info/ProductDescription";
import ProductTitle from "./_components/Info/ProductTitle";
//import { Providers } from "@/app/providers";

type SizeAPIResponse = {
  id: number;
  attributes: {
    value: number;
  };
};

type SizesAPIResponse = {
  data: SizeAPIResponse[];
};

//const queryClient = new QueryClient();

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fieldsToPopulate: PopulateField[] = [
    "images",
    "brand",
    "categories",
    "sizes",
    "gender",
    "color",
  ];

  const { data, error, isLoading } = ProductDetails(id, fieldsToPopulate);
  
  if (isLoading) return <LoadingPage />;
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

        width: { xs: "100%", md: "800px", lg: "1000px", xl: "1300px" },
        paddingTop: { md: "100px" },
        margin: { md: "0 auto" },
      }}
    >
      <Box
        sx={{ width: { xs: "100%", md: "50%" } }} //, backgroundColor: "#FFCCA9"
      >
        <ProductImageGallery images={images} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { xs: "100%", md: "50%" },
          paddingLeft: { xs: "20px", md: "50px", lg: "80px", xl: "100px" },
          paddingRight: { xs: "20px", md: "0" },
          paddingTop: { xs: "30px" },
        }} //backgroundColor: "#cccccc",
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

      <ProductPage params={params} />

  );
}
