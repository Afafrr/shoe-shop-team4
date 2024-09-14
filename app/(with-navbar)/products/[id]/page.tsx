"use client";

import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

import LoadingPage from "@/components/Loading/LoadingPage";
import ProductDetails, { PopulateField } from "@/utils/api/singleProduct";
  
import ProductImageGallery from "@/app/(with-navbar)/products/[id]/_components/gallery/ProductImageGallery";
import SizeSelector from "@/app/(with-navbar)/products/[id]/_components/buttons/SizeSelector";
import ActionButtons from "@/app/(with-navbar)/products/[id]/_components/buttons/ActionButtons";
import ProductDescription from "@/app/(with-navbar)/products/[id]/_components/info/ProductDescription";
import ProductTitle from "./_components/info/ProductTitle";
import ColorSelector from "./_components/buttons/ColorSelector";


type SizeAPIResponse = {
  id: number;
  attributes: {
    value: number;
  };
};

type SizesAPIResponse = {
  data: SizeAPIResponse[];
};

type Color = {
  id: number;
  attributes: {
    name: string;
  };
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);

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

  const { name, price, description, images, sizes, gender, color } =
    data.attributes;

  const mappedSizes =
    (sizes as SizesAPIResponse)?.data?.map((size: SizeAPIResponse) => ({
      id: size.id,
      attributes: {
        value: size.attributes.value,
      },
    })) || [];
  
  const productGender = gender?.data?.attributes?.name
    ? `${gender.data.attributes.name}'s Shoes`
    : "Unisex";
  
  const productColors = color?.data
    ? [
        {
          id: color.data.id,
          attributes: {
            name: color.data.attributes.name,
          },
        },
      ]
    : [{ id: 1, attributes: { name: "Unspecified" } }];
  
  const handleColorSelect = (selectedColor: Color) => {
    setSelectedColorId(selectedColor.id);
    console.log("Selected color ID:", selectedColorId);
  };  
  const handleSizeSelect = (sizeId: number) => {
    console.log("Selected size ID:", sizeId);
    setSelectedSizeId(sizeId);
  };  

  const handleAddToBag = () => {
      if (selectedColorId && selectedSizeId) {
        const productToAdd = {
          productId: id,
          colorId: selectedColorId,
          sizeId: selectedSizeId,
        };
        console.log("Add to Bag:", productToAdd);
      } else {
        console.log("Select color and size");
      }
  };
  
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
        <ProductTitle name={name} price={price} gender={productGender} />
        <ColorSelector colors={productColors} onSelect={handleColorSelect} />
        <SizeSelector sizes={mappedSizes} onSelect={handleSizeSelect} />
        <ActionButtons handleAddToBag={handleAddToBag} />
        <ProductDescription description={description} />
      </Box>
    </Box>
  );
};

