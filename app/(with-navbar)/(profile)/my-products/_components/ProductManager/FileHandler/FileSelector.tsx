"use client";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Image from "next/image";
import FileExplorer from "./FileExplorer";
import WarningIcon from "@/components/Form/WarningIcon";
import { useFormContext } from "react-hook-form";
import { Dispatch } from "react";

// This component is the UI to manage the file selection. Contains FileExplorer component, which manages the actual file selection.

type FileSelectorProps = {
  handleFileChange: Dispatch<any>;
};

export default function FileSelector({ handleFileChange }: FileSelectorProps) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "0.84",
        position: "relative",
      }}
    >
      <Box
        id="testing"
        component="section"
        sx={{
          width: "100%",
          aspectRatio: "0.84",
          p: 2,
          border: "1px dashed grey",
          borderImageSource:
            "repeating-linear-gradient(45deg, black 0, black 10px, transparent 10px, transparent 20px)",
          borderImageSlice: 1,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/svg/gallery.svg"
            alt="My Icon"
            width={50}
            height={50}
            layout="intrinsic"
          />
          <Typography width={"65%"} textAlign={"center"}>
            Drop your image here, or select
          </Typography>
          <FileExplorer handleFileChange={handleFileChange}>
            click to browse
          </FileExplorer>
        </Box>
      </Box>

      {errors.image ? (
        <Typography
          color={"red"}
          sx={{
            position: "absolute",
            bottom: "-30px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          <WarningIcon /> {errors.image.message as string}
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
}
