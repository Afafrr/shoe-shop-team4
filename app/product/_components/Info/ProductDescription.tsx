import { Typography, Box } from "@mui/material";

type ProductDescriptionProps = {
  description: string;
};

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ width: "100%", padding: "0 16px" }}
    >
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography>{description}</Typography>
    </Box>
  );
}
