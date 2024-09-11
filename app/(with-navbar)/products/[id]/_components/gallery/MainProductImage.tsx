import React, { useRef } from "react";
import ImageGallery from "react-image-gallery";
import { useMediaQuery, useTheme, Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "react-image-gallery/styles/css/image-gallery.css";
import "./gallery.css";


type ImageProps = {
  url: string;
  alternativeText: string;
  width?: number;
  height?: number;
};

type MainProductImageProps = {
  images: ImageProps[];
};


export default function MainProductImage({ images }: MainProductImageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const galleryRef = useRef<ImageGallery>(null);

  const imageGalleryItems = images.map((image) => ({
    original: image.url,
    thumbnail: image.url,
    originalAlt: image.alternativeText || "Product Image",
    thumbnailAlt: image.alternativeText || "Thumbnail Image",
  }));

  const handleNext = () => {
    if (galleryRef.current) {
      (galleryRef.current as any)?.slideToIndex(
        (galleryRef.current as any)?.getCurrentIndex() + 1
      );
    }
  };

  const handlePrev = () => {
    if (galleryRef.current) {
      (galleryRef.current as any)?.slideToIndex(
        (galleryRef.current as any)?.getCurrentIndex() - 1
      );
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { md:"500px", xl:"628px"},
        overflow: "hidden",
      }}
    >

      <ImageGallery
        ref={galleryRef}
        items={imageGalleryItems}
        showThumbnails={!isMobile}
        thumbnailPosition={isMobile ? "bottom" : "left"}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={false}
        slideDuration={450}
        renderLeftNav={() => null}
        renderRightNav={() => null}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          zIndex: 1000,
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            color: "#000",
            backgroundColor: "rgba(255, 255, 255, 1)",
            width: 24,
            height: 24,
            fontSize: 16,
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 16 }} />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            color: "#000",
            backgroundColor: "rgba(255,255,255, 1)",
            width: 24,
            height: 24,
            fontSize: 16,
          }}
        >
          <ChevronRightIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
