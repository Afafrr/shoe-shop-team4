import { Button, Box } from "@mui/material";

type ActionButtonsProps = {
  handleAddToBag: () => void;
};

export default function ActionButton({ handleAddToBag }: ActionButtonsProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      paddingBottom="70px"
      paddingTop="36px"
    >
      <Button
        variant="contained"
        size="large"
        onClick={handleAddToBag}
        sx={{
          width: { xs: "50%", md: "80%" },
        }}
      >
        Add to Bag
      </Button>
    </Box>
  );
}
