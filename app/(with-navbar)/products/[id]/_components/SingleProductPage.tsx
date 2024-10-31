"use client";

import {
  Box,
  Button,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  SnackbarContent,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import LoadingPage from "@/components/Loading/LoadingPage";
import productDetails, { PopulateField } from "@/utils/api/singleProduct";
import { SizesAPIResponse, Color, Size, Gender } from "@/types/singleProduct";

import ProductImageGallery from "@/app/(with-navbar)/products/[id]/_components/gallery/ProductImageGallery";
import SizeSelector from "@/app/(with-navbar)/products/[id]/_components/buttons/SizeSelector";
import ActionButton from "@/app/(with-navbar)/products/[id]/_components/buttons/ActionButtons";
import ProductDescription from "@/app/(with-navbar)/products/[id]/_components/Info/ProductDescription";
import ProductTitle from "./Info/ProductTitle";
import ColorSelector from "./buttons/ColorSelector";
import WarningIcon from "@/components/Form/WarningIcon";
import { NewCartItem, useCart } from "@/contexts/Cart";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Close } from "@mui/icons-material";
import { getFieldOptions } from "../../_lib/utils";
import { NewWishlistItem, useWishlist } from "@/contexts/Wishlist";
import { useRecently } from "@/contexts/RecentlyViewed";

type SingleProductPageProps = {
  productId: string;
  fieldsToPopulate: PopulateField[];
};
type MessageManager = {
  state: boolean;
  message: string;
  action: ReactNode | null;
};

export default function SingleProductPage({
  productId,
  fieldsToPopulate,
}: SingleProductPageProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [fieldsMissing, setFieldsMissing] = useState(false);
  const [showMessage, setShowMessage] = useState<MessageManager>({
    state: false,
    message: "",
    action: null,
  });
  const { addItem } = useCart();
  const Wishlist = useWishlist();
  const Recent = useRecently();
  const router = useRouter();

  const { data, error, isLoading } = productDetails(
    productId,
    fieldsToPopulate
  );

  const { data: colors, error: queryError } = useQuery({
    queryKey: ["colors"],
    queryFn: () => getFieldOptions("colors"),
  });

  const getGenderName = useCallback((genderObject: Gender) => {
    return genderObject?.data?.attributes?.name
      ? `${genderObject.data.attributes.name}'s Shoes`
      : "Unisex";
  }, []);

  useEffect(() => {
    if (data) {
      const productData = data.data;
      const { id } = productData;
      const { name, images, price, gender } = productData.attributes;
      const productGender = getGenderName(gender);
      const imageUrl = images.data[0].attributes.url;
      Recent.addItem({
        productId: id,
        name,
        price,
        gender: productGender,
        imageUrl,
      });
    }
  }, [data]);

  if (isLoading) return <LoadingPage />;
  if (error) throw new Error("An error has occurred, please try again");
  if (!data) return null;

  const productData = data.data;
  const { name, price, description, images, sizes, gender, color } =
    productData.attributes;

  const mappedSizes =
    (sizes as SizesAPIResponse)?.data?.map((size: Size) => ({
      id: size.id,
      attributes: {
        value: size.attributes.value,
      },
    })) || [];

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

  const productGender = gender?.data?.attributes?.name
    ? `${gender.data.attributes.name}'s Shoes`
    : "Unisex";

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

    setShowMessage({ ...showMessage, state: false });
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
      setShowMessage({
        state: true,
        message: "Product added to cart",
        action: cartAction,
      });
      setSelectedColor(null);
      setSelectedSize(null);
    } else {
      setFieldsMissing(true);
    }
  };

  const handleAddToWishlist = () => {
    const itemToAdd: NewWishlistItem = {
      productId: Number(productId),
      name: name,
      gender: productGender,
      imageUrl: images.data[0].attributes.url,
      price: price,
    };
    const existingItem = Wishlist.wishlistItems.find(
      (item) => item.productId === itemToAdd.productId
    );
    if (existingItem) {
      setShowMessage({
        state: true,
        message: "Product already in wishlist",
        action: wishlistAction,
      });
    } else {
      Wishlist.addItem(itemToAdd);
      setShowMessage({
        state: true,
        message: "Product added to wishlist",
        action: wishlistAction,
      });
    }
    setSelectedColor(null);
    setSelectedSize(null);
  };

  const cartAction = (
    <Fragment>
      <Button onClick={() => router.push("/chart")}>Go to cart</Button>
      <IconButton aria-label="close" onClick={handleClose}>
        <Close fontSize="small" />
      </IconButton>
    </Fragment>
  );
  const wishlistAction = (
    <Fragment>
      <Button onClick={() => router.push("/my-wishlist")}>
        Go to wishlist
      </Button>
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
        <Stack direction={"row"} spacing={4}>
          <ActionButton
            buttonAction={handleAddToWishlist}
            variant="outlined"
            buttonText="Add to Wishlist"
          />
          <ActionButton buttonAction={handleAddToBag} buttonText="Add to Bag" />
        </Stack>
        <ProductDescription description={description} />
        <Snackbar
          open={showMessage.state}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <SnackbarContent
            style={{
              backgroundColor: "white",
            }}
            message={
              <Typography color="textPrimary">{showMessage.message}</Typography>
            }
            action={showMessage.action}
          />
        </Snackbar>
      </Box>
    </Box>
  );
}
