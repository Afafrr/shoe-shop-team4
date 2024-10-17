import { Box, Button, Grid, Typography } from "@mui/material";

type ColorAttributes = {
  name: string;
};

type Color = {
  id: number;
  attributes: ColorAttributes;
};

type ColorSelectorProps = {
  colors: Color[];
  onSelect: (color: Color) => void;
  selectedColor: string | null;
};

export default function ColorSelector({
  colors,
  onSelect,
  selectedColor,
}: ColorSelectorProps) {
  const handleColorClick = (color: Color) => {
    onSelect(color);
  };

  return (
    <Box sx={{ width: "100%", padding: "0" }}>
      <Typography variant="h6" gutterBottom>
        Color
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 5, sm: 7, md: 4, lg: 5, xl: 6 }}
      >
        {colors.map((color) => {
          return (
            <Grid item xs={1} md={1} lg={1} xl={1} key={color.id}>
              <Button
                key={color.id}
                variant={
                  selectedColor === color.attributes.name
                    ? "contained"
                    : "outlined"
                }
                onClick={() => handleColorClick(color)}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: color.attributes.name.toLowerCase(),
                  border:
                    selectedColor === color.attributes.name
                      ? "1px solid red"
                      : "1px solid black",
                  borderRadius: "10%",
                  "&:hover": {
                    backgroundColor: color.attributes.name.toLowerCase(),
                  },
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
