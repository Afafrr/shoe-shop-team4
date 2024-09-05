import { Box, Avatar, Typography } from "@mui/material";

export default function AvatarBox({ name = "", points = 0 }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "end",
        gap: { xs: "13px", md: "26px" },
        position: "relative",
        top: { xs: "-15px", md: "-30px" },
      }}
    >
      <Avatar
        sx={{
          width: { xs: "60px", md: "120px" },
          height: { xs: "60px", md: "120px" },
          border: "4px solid #fff",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: { md: "15px" },
        }}
      >
        <Typography
          fontWeight={500}
          fontSize={{ xs: "14px", md: "20px" }}
          color="text.primary"
        >
          {name}
        </Typography>
        <Typography
          fontWeight={300}
          fontSize={{ xs: "12px", md: "15px" }}
          color="text.secondary"
        >
          {points} bonus points
        </Typography>
      </Box>
    </Box>
  );
}
