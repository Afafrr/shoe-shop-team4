"use client";

import {
  Box,
  Button,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  SnackbarContent,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import LoadingPage from "@/components/Loading/LoadingPage";
import productDetails, { PopulateField } from "@/utils/api/singleProduct";
import { SizesAPIResponse, Color, Size } from "@/types/singleProduct";

import ProductImageGallery from "@/app/(with-navbar)/products/[id]/_components/gallery/ProductImageGallery";
import SizeSelector from "@/app/(with-navbar)/products/[id]/_components/buttons/SizeSelector";
import ActionButton from "@/app/(with-navbar)/products/[id]/_components/buttons/ActionButtons";
import ProductDescription from "@/app/(with-navbar)/products/[id]/_components/Info/ProductDescription";
import ProductTitle from "./Info/ProductTitle";
import ColorSelector from "./buttons/ColorSelector";
import WarningIcon from "@/components/Form/WarningIcon";
import { NewCartItem, useCart } from "@/contexts/Cart";
import { useRouter } from "next/navigation";
import { Close } from "@mui/icons-material";

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
  const [showMessage, setShowMessage] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const { data, error, isLoading } = productDetails(
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

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowMessage(false);
  };

  const handleAddToBag = () => {
    setFieldsMissing(false);
    if (selectedColor && selectedSize) {
      const itemToAdd: NewCartItem = {
        productId: Number(productId),
        quantity: 1,
        name: name,
        gender: productGender,
        image: images.data[0].attributes.url,
        price: price,
        color: selectedColor,
        size: selectedSize,
      };
      addItem(itemToAdd);
      setShowMessage(true);
      setSelectedColor(null);
      setSelectedSize(null);
    } else {
      setFieldsMissing(true);
    }
  };

  const action = (
    <Fragment>
      <Button onClick={() => router.push("/chart")}>Go to cart</Button>
      <IconButton aria-label="close" onClick={handleClose}>
        <Close fontSize="small" />
      </IconButton>
    </Fragment>
  );

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
            <WarningIcon /> Please select color and size.
          </Typography>
        )}
        <ColorSelector
          selectedColor={selectedColor}
          colors={productColors}
          onSelect={handleColorSelect}
        />
        <SizeSelector
          selectedSize={selectedSize}
          sizes={mappedSizes}
          onSelect={handleSizeSelect}
        />
        <ActionButton handleAddToBag={handleAddToBag} />
        <ProductDescription description={description} />
        <Snackbar
          open={showMessage}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <SnackbarContent
            style={{
              backgroundColor: "white",
            }}
            message={<Typography color="textPrimary">Product added</Typography>}
            action={action}
          />
        </Snackbar>
      </Box>
    </Box>
  );
}
