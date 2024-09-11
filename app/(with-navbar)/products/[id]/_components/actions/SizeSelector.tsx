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
    <Box sx={{ width: "100%", padding: "0" }}>
      <Typography variant="h6" gutterBottom>
        Select Size
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        sx={{
          gap: { xs:"15px", md: "15px", lg: "20px", xl: "25px" },
        }}
      >
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
              width: { xs: "70px", md: "60px", lg: "75px", xl: "90px" },
              height: { xs: "40px", md: "35px", lg: "45px", xl: "55px" },
              padding: 0,
              fontSize: { xs: "14px", md: "12px", xl: "15px" },
            }}
          >
            EU - {size.attributes.value}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
