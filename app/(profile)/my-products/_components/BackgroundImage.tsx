"use client";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import background from "@public/profile/my-profile-background.png";
import theme from "@/theme";

export default function BackgroundImage() {
  let breakPointMd = theme.breakpoints.values.md;
  let breakPointSm = theme.breakpoints.values.sm;
  const isDesktop = useMediaQuery(theme.breakpoints.up(breakPointMd));
  const isSmall = useMediaQuery(theme.breakpoints.up(breakPointSm));
  //background image changes to smaller on small breakpoint
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "132px", md: "262px" },
        overflow: "hidden",
      }}
    >
      <Image
        priority={true}
        quality={100}
        src={background}
        alt="User abstract background image"
        style={{
          height: "100%",
          width: `${
            isDesktop ? "100%" : `${isSmall ? breakPointMd : breakPointSm}px`
          }`,
        }}
      />
    </Box>
  );
}
