import { Avatar, Box, Button } from "@mui/material";
import React from "react";

export default function AvatarBox() {
  return (
    <Box sx={{ display: "flex", mt: { xs: "12px", md: "35px" } }}>
      <Avatar
        alt=""
        sx={{
          width: { xs: "100px", md: "150px" },
          height: { xs: "100px", md: "150px" },
          padding: "15px",
          border: "4px solid #fff",
        }}
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
        <Button variant="outlined">Change Photo</Button>
        <Button variant="contained">Delete</Button>
      </Box>
    </Box>
  );
}
