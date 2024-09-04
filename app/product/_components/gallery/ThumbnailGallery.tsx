import Image from "next/image";
import { Box } from "@mui/material";


type ThumbnailProps = {
  thumbnailUrl: string;
  alternativeText: string;
};

type ThumbnailGalleryProps = {
  images: ThumbnailProps[];
};

export default function ThumbnailGallery({ images }: ThumbnailGalleryProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", 
      }}
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.thumbnailUrl}
          alt={image.alternativeText}
          width={100}
          height={100}
          style={{
            borderRadius: 4, 
            objectFit: "cover",
          }}
        />
      ))}
    </Box>
  );
}
