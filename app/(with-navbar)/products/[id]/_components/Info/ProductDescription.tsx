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
      sx={{ width: "100%", padding: "0 0 30px 0", wordBreak: "break-word" }}
    >
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography
        sx={{ fontSize: "16px", fontWeight: "300", color: "#494949" }}
      >
        {description}
      </Typography>
    </Box>
  );
}
