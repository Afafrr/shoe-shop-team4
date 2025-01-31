import { Box, Typography } from "@mui/material";
import MainProductImage from "./MainProductImage";

type ImageProps = {
  url: string;
  alternativeText: string;
  thumbnailUrl: string;
  width?: number;
  height?: number;
};

type ProductImageGalleryProps = {
  images: {
    data: Array<{
      id: number;
      attributes: {
        url: string;
        alternativeText: string | null;
        width?: number;
        height?: number;
        formats?: {
          thumbnail?: {
            url: string;
          };
        };
      };
    }>;
  };
};

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  if (!images?.data?.length) {
    return <Typography>No image available</Typography>;
  }

  const imageList: ImageProps[] = images.data.map((image) => ({
    url: image.attributes.url,
    alternativeText: image.attributes.alternativeText || "Product Image",
    height: image.attributes.width,
    width: image.attributes.height,
    thumbnailUrl:
      image.attributes.formats?.thumbnail?.url || image.attributes.url,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <MainProductImage images={imageList} />
    </Box>
  );
}
