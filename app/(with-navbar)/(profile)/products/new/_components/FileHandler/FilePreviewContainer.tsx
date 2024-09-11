"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import "./styles.css";
import { useState } from "react";

type ImageContainerProps = {
  imageUrl: string;
  handleClick: () => void;
};

export default function FilePreviewContainer({
  imageUrl,
  handleClick,
}: ImageContainerProps) {
  let [selected, setSelected] = useState(false);
  let shadow = "0px 0px 41px 0px rgb(22, 22, 22) inset";
  let style = selected
    ? { opacity: "0.5", shadow, display: "block" }
    : { opacity: "1", shadow: "", display: "none" };
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "0.84",
      }}
      onClick={handleClick}
    >
      <Box
        id="main-container"
        className="pointer"
        component="section"
        sx={{
          boxShadow: style.shadow,
          position: "relative",
          width: "100%",
          aspectRatio: "0.84",
          border: "1px solid gray",
        }}
      >
        <Image
          src={imageUrl as string}
          alt="File Preview"
          fill
          sizes="300px"
          style={{ opacity: style.opacity }}
          onMouseOver={() => setSelected(true)}
          onMouseOut={() => setSelected(false)}
        />
      </Box>
      <Image
        className="pointer"
        style={{
          display: style.display,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        src={"/svg/trashCan.svg"}
        alt="remove item"
        width={70}
        height={70}
        sizes="15px 15px"
        onMouseOver={() => setSelected(true)}
      />
    </Box>
  );
}
