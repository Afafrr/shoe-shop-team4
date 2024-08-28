import { Avatar, Box, Button } from "@mui/material";
import React from "react";

const AvatarBox = () => {
  return (
    <Box sx={{ display: "flex", mt: { xs: "12px", md: "35px" } }}>
      <Avatar
        alt=""
        sx={{
          width: { xs: "100px", md: "150px" },
          height: { xs: "100px", md: "150px" },
          padding: "15px",
          border: "4px solid",
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
        <Button sx={{ backgroundColor: "lightgrey" }}>Change Photo</Button>
        <Button sx={{ backgroundColor: "lightgrey" }}>Delete</Button>
      </Box>
    </Box>
  );
};

export default AvatarBox;
