"use client";

import { Box, Typography } from "@mui/material";
import { useState } from "react";
import LoadingPage from "@/components/Loading/LoadingPage";
import ProductDetails, { PopulateField } from "@/utils/api/singleProduct";
import { SizesAPIResponse, Color, Size } from "@/types/singleProduct";

import ProductImageGallery from "@/app/(with-navbar)/products/[id]/_components/gallery/ProductImageGallery";
import SizeSelector from "@/app/(with-navbar)/products/[id]/_components/buttons/SizeSelector";
import ActionButtons from "@/app/(with-navbar)/products/[id]/_components/buttons/ActionButtons";
import ProductDescription from "@/app/(with-navbar)/products/[id]/_components/Info/ProductDescription";
import ProductTitle from "./Info/ProductTitle";
import ColorSelector from "./buttons/ColorSelector";
import WarningIcon from "@/components/Form/WarningIcon";
import { CartItem, useCart } from "@/contexts/Cart";
import { useRouter } from "next/navigation";

type SingleProductPageProps = {
  productId: string;
  fieldsToPopulate: PopulateField[];
};

export default function SingleProductPage({
  productId,
  fieldsToPopulate,
}: SingleProductPageProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [fieldsMissing, setFieldsMissing] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const { data, error, isLoading } = ProductDetails(
    productId,
    fieldsToPopulate
  );

  if (isLoading) return <LoadingPage />;
  if (error) throw new Error("An error has occurred, please try again");
  if (!data) return null;

  const { name, price, description, images, sizes, gender, color } =
    data.data.attributes;

  const mappedSizes =
    (sizes as SizesAPIResponse)?.data?.map((size: Size) => ({
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
    setSelectedColor(selectedColor.attributes.name);
  };

  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
  };

  const handleAddToBag = () => {
    setFieldsMissing(false);
    if (selectedColor && selectedSize) {
      const itemToAdd: CartItem = {
        id: Number(productId),
        quantity: 1,
        name: name,
        gender: productGender,
        image: images.data[0].attributes.url,
        price: price,
        color: selectedColor,
        size: selectedSize,
      };
      addItem(itemToAdd);
      router.push("/chart");
    } else {
      setFieldsMissing(true);
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
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
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
        }}
      >
        <ProductTitle name={name} price={price} gender={productGender} />
        {fieldsMissing && (
          <Typography color="red">
            <WarningIcon /> Please, select color and size
          </Typography>
        )}
        <ColorSelector colors={productColors} onSelect={handleColorSelect} />
        <SizeSelector sizes={mappedSizes} onSelect={handleSizeSelect} />
        <ActionButtons handleAddToBag={handleAddToBag} />
        <ProductDescription description={description} />
      </Box>
    </Box>
  );
}
