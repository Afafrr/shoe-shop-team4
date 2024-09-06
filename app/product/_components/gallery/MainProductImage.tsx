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
        margin: 0,
        padding: 0,
        maxWidth: { xs: "100%", md: 588 },
        height: { xs: "auto", md: 628 },
        overflow: "hidden",
      }}
    >
      <Image
        src={image.url}
        alt={image.alternativeText || "Product Image"}
        width={588}
        height={628}
      />
    </Box>
  );
}
