import { AddToBag } from "@/public/svg/AddToBag";
import { Box, Typography } from "@mui/material";

export function ProductOverlay({ redirect }: { redirect: () => void }) {
  return (
    <Box
      className="hoverOverlay"
      onClick={redirect}
      sx={{
        position: "absolute",
        top: "40%",
        left: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        cursor: "pointer",
        bgcolor: "#FFFFFF",
        width: { xs: "60px", md: "80px" },
        height: { xs: "60px", md: "80px" },
        opacity: 0,
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s ease",
      }}
    >
      <AddToBag />
      <Typography sx={{ fontSize: "8px", fontWeight: 500 }}>
        Add to chart
      </Typography>
    </Box>
  );
}
