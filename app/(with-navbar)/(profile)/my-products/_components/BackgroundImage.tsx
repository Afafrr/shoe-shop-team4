"use client";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import background from "@public/profile/my-profile-background.png";
import theme from "@/theme";

export default function BackgroundImage() {
  let breakPointMd = theme.breakpoints.values.md;
  const isDesktop = useMediaQuery(theme.breakpoints.up(breakPointMd));
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "132px", md: "262px" },
      }}
    >
      <Image
        priority={true}
        quality={100}
        src={background}
        alt="User abstract background image"
        fill
        style={{ objectFit: `${isDesktop ? "fill" : "cover"}` }}
      />
    </Box>
  );
}
