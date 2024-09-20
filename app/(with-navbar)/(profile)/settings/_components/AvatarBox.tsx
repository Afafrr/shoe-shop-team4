import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRef } from "react";
import { ChangeEvent } from "react";
import WarningIcon from "@/components/Form/WarningIcon";
import { ReducedData } from "./PageClient";
import { validateFile } from "../_helpers/validateFile";

export default function AvatarBox({
  formData,
  setFormData,
  image,
  setImage,
}: {
  formData: ReducedData;
  setFormData: Dispatch<SetStateAction<ReducedData>>;
  image: string | undefined;
  setImage: Dispatch<SetStateAction<string | undefined>>;
}) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  //open file browser on change click
  function handleChangeClick() {
    imageInputRef.current?.click();
  }

  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setError("");

    if (file) {
      //file size check
      const validate = validateFile(file);
      if (validate) {
        setError(validate);
        return;
      }
      //display just picked image
      setImage(URL.createObjectURL(file));

      const { deleteImg, ...newFormData } = formData;
      setFormData({
        ...newFormData,
        avatar: file,
      });
      e.target.value = "";
    }
  }
  function handleDeleteClick() {
    const { avatar, ...newFormData } = formData;
    setFormData({ ...newFormData, deleteImg: true });
    setImage("");
  }

  return (
    <Box>
      <Box sx={{ display: "flex", mt: { xs: "12px", md: "35px" } }}>
        <Avatar
          alt=""
          src={image}
          sx={{
            width: { xs: "100px", md: "150px" },
            height: { xs: "100px", md: "150px" },
            border: "4px solid #fff",
          }}
        />
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          ref={imageInputRef}
        />
        <Box
          sx={{
            display: "flex",
            pl: { xs: "28px", md: "76px" },
            flexDirection: "column",
            justifyContent: "center",
            gap: { xs: "16px", md: "24px" },
          }}
        >
          <Button variant="outlined" onClick={handleChangeClick}>
            Change Photo
          </Button>
          <Button variant="contained" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Box>
      </Box>
      {error ? (
        <Typography
          color="red"
          textAlign="center"
          sx={{
            mt: "20px",
            maxWidth: { xs: "320px", sm: "100%" },
          }}
        >
          <WarningIcon /> {error}
        </Typography>
      ) : null}
    </Box>
  );
}
