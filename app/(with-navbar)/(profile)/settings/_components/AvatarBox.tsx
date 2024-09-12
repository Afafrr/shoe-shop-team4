import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRef } from "react";
import { ChangeEvent } from "react";
import WarningIcon from "@/components/Form/WarningIcon";
import { FormObj } from "./PageClient";
export default function AvatarBox({
  formData,
  setFormData,
  image,
  setImage,
}: {
  formData: FormObj;
  setFormData: Dispatch<SetStateAction<FormObj>>;
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
      if (file?.size > 204800) {
        setError("Image size should not exceed 200 KB.");
        return;
      }
      //display just picked image
      setImage(URL.createObjectURL(file));
      //pass actual selected image
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
        <Typography color="red" textAlign="center">
          <WarningIcon /> {error}
        </Typography>
      ) : null}
    </Box>
  );
}
