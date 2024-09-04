import { Button, Box } from "@mui/material";

export default function ActionButtons() {
  return (
    <Box display="flex" flexDirection="row"  gap={2}>
      <Button variant="contained">Favorite</Button>
      <Button variant="contained">Add to Bag</Button>
    </Box>
  );
}
