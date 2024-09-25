import { Button, Box } from "@mui/material";

type ActionButtonsProps = {
  handleAddToBag: () => void;
};
export default function ActionButtons({ handleAddToBag }: ActionButtonsProps) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent={{ xs: "center", md: "space-between" }}
      paddingBottom="70px"
      paddingTop="36px"
      gap={{ xs: "8px", md: "0" }}
    >
      <Button
        variant="outlined"
        sx={{
          width: { xs: "200px", md: "170px", lg: "200px", xl: "260px" },
          height: { xs: "55px", md: "53px", xl: "61px" },
        }}
      >
        Favorite
      </Button>
      <Button
        variant="contained"
        onClick={handleAddToBag}
        sx={{
          width: { xs: "170px", md: "170px", lg: "200px", xl: "260px" },
          height: { xs: "55px", md: "53px", xl: "61px" },
        }}
      >
        Add to Bag
      </Button>
    </Box>
  );
}
