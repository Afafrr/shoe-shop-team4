"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import "./styles.css";
import { useState } from "react";
import ActionConfirmationModal from "../modals/ActionConfirmationModal";

// Component to store file previews. Takes a Url to show an Image and an onClick handler.

type ImageContainerProps = {
  imageUrl: string;
  handleClick: () => void;
};

export default function FilePreviewContainer({
  imageUrl,
  handleClick,
}: ImageContainerProps) {
  //Logic to manage the DeleteModal once Preview is clicked
  const [open, setOpen] = useState(false);
  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // Logic to manage hover state of component
  let [selected, setSelected] = useState(false);
  let shadow = "0px 0px 400px 34px rgba(0,0,0,0.75) inset";
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
      onClick={handleOpen}
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
      <Box
        className="pointer"
        sx={{
          width: "25%",
          aspectRatio: 1,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 1)",
          opacity: "0.75",
          display: style.display,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onMouseOver={() => setSelected(true)}
      >
        <Image
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          src={"/svg/trashIcon.svg"}
          alt="remove item"
          width={20}
          height={20}
          sizes="20px 20px"
        />
      </Box>
      <ActionConfirmationModal
        name="Delete"
        message="Are you sure you want to delete product image?"
        open={open}
        handleClose={handleClose}
        actionFn={handleClick}
      ></ActionConfirmationModal>
    </Box>
  );
}
