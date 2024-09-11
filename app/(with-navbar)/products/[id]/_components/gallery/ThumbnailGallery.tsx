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
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 2,
        height: "auto",
        paddingTop: 0,
      }}
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.thumbnailUrl}
          alt={image.alternativeText}
          width={76}
          height={76}
          style={{

            objectFit: "cover",
          }}
        />
      ))}
    </Box>
  );
}
