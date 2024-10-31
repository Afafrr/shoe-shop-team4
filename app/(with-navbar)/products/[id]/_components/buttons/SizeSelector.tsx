import { Button, Typography, Box, Grid } from "@mui/material";

type SizeAPIResponse = {
  id: number;
  attributes: {
    value: number;
  };
};

type SizeSelectorProps = {
  sizes: SizeAPIResponse[];
  onSelect: (sizeId: number) => void;
  selectedSize: number | null;
};

export default function SizeSelector({
  sizes,
  onSelect,
  selectedSize,
}: SizeSelectorProps) {
  const handleSizeSelect = (size: SizeAPIResponse) => {
    onSelect(size.attributes.value);
  };

  return (
    <Box sx={{ width: "100%", padding: "0" }}>
      <Typography variant="h6" gutterBottom>
        Select Size
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 5, sm: 7, md: 4, lg: 5, xl: 6 }}
      >
        {sizes.map((size) => (
          <Grid item xs={1} md={1} lg={1} xl={1} key={size.id}>
            <Button
              color={
                selectedSize === size.attributes.value ? "primary" : "inherit"
              }
              variant={
                selectedSize === size.attributes.value
                  ? "contained"
                  : "outlined"
              }
              sx={{
                fontSize: "0.75rem",
                width: "70px",
                height: "45px",
                borderRadius: "8px",
                mb: "10px",
              }}
              onClick={() => handleSizeSelect(size)}
            >
              {`EU-${size.attributes.value}`}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
