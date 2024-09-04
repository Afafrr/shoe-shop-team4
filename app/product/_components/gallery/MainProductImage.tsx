import Image from "next/image";
import { Box, Typography } from "@mui/material";

type ImageProps = {
  url: string;
  alternativeText: string;
  width?: number;
  height?: number;
};

export default function MainProductImage({ image }: { image: ImageProps }) {
  if (!image) {
    return <Typography>No image available</Typography>;
  }
 
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: 0,
        padding: 0,
        maxWidth: { xs: "100%", md: 800 },
        overflow: "hidden",
      }}
    >
      <Image
        src={image.url}
        alt={image.alternativeText || "Product Image"}
        width={image.width || 800}
        height={image.height || 600}
        style={{
          width: "100%", 
          height: "auto", 
        }}
      />
    </Box>
  );
}
