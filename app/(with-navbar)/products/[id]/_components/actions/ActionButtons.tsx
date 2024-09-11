import { Button, Box } from "@mui/material";

export default function ActionButtons() {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" paddingBottom="70px" paddingTop="36px">
      <Button
        variant="outlined"
        sx={{
          width: { xs: "200px", md: "170px", lg:"200px", xl: "260px" },
          height: { xs: "55px", md: "53px", xl: "61px" },
        }}
      >
        Favorite
      </Button>
      <Button
        variant="contained"
        sx={{
          width: { xs: "170px", md: "170px", lg:"200px", xl: "260px" },
          height: { xs: "55px", md: "53px", xl: "61px" },
        }}
      >
        Add to Bag
      </Button>
    </Box>
  );
}
