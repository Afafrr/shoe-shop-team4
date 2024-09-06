import { Button, Typography, Box } from "@mui/material";
type SizeAPIResponse = {
  id: number;
  attributes: {
    value: number;
  };
};

type SizeSelectorProps = {
  sizes: SizeAPIResponse[];
};

export default function SizeSelector({ sizes }: SizeSelectorProps) {
  return (
    <Box sx={{ width: "100%", padding: "0 16px" }}>
      <Typography variant="h6" gutterBottom>
        Select Size
      </Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
        {sizes.map((size) => (
          <Button
            key={size.id}
            variant="outlined"
            sx={{
              borderColor: "#5C5C5C",
              borderRadius: "8px",
              color: "#5C5C5C",
              backgroundColor: "#FFFFFF",
              textAlign: "center",
              justifyContent: "center",
              width: "85px",
              height: "55px",
              padding: 0,
              fontSize: "15px",
              gap:4,
            }}
          >
            EU - {size.attributes.value}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
