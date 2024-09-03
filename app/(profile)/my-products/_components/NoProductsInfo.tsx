import { ProductsBagIcon } from "@/public/svg/ProductsBagIcon";
import { Box, Typography, Button } from "@mui/material";
export default function NoProductsInfo({
  onBtnClick,
}: {
  onBtnClick: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        mx: "auto",
        mt: { xs: "60px", md: "40px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "72px" },
          height: { xs: "72px" },
          backgroundColor: "#F9FAFB",
          borderRadius: "50%",
        }}
      >
        <ProductsBagIcon />
      </Box>
      <Typography
        textAlign="center"
        fontSize={{ xs: "16px", md: "20px" }}
        fontWeight={500}
      >
        You don't have any products yet
      </Typography>
      <Typography
        textAlign="center"
        color="text.secondary"
        fontSize={{ xs: "16px", md: "20px" }}
        fontWeight={300}
      >
        Post can contain video, images and text.
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: "152px",
          height: "40px",
          mt: { xs: "32px", md: "42px" },
        }}
        onClick={() => onBtnClick()}
      >
        Add Product
      </Button>
    </Box>
  );
}
