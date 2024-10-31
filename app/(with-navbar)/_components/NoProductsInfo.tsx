import { ProductsBagIcon } from "@/public/svg/ProductsBagIcon";
import { Box, Typography, Button } from "@mui/material";

type NoProductsInfoProps = {
  onBtnClick: () => void;
  title?: string;
  subtitle?: string;
  btnDescription?: string;
};

export default function NoProductsInfo({
  onBtnClick,
  title = "You don't have any products yet",
  subtitle = "Post can contain video, images and text.",
  btnDescription = "Add Product",
}: NoProductsInfoProps) {
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
        {title}
      </Typography>
      <Typography
        textAlign="center"
        color="text.secondary"
        fontSize={{ xs: "16px", md: "20px" }}
        fontWeight={300}
      >
        {subtitle}
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: "152px",
          height: "40px",
          mt: { xs: "32px", md: "42px" },
          mb: { xs: "30px", md: "60px" },
        }}
        onClick={() => onBtnClick()}
      >
        {btnDescription}
      </Button>
    </Box>
  );
}
