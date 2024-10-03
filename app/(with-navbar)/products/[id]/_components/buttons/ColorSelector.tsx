import { Box, Button, Typography } from "@mui/material";

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
      <Box sx={{ display: "flex", gap: 2 }}>
        {colors.map((color) => {
          return (
            <Button
              key={color.id}
              onClick={() => handleColorClick(color)}
              sx={{
                width: 40,
                height: 40,
                backgroundColor: color.attributes.name.toLowerCase(),
                border:
                  selectedColor === color.attributes.name
                    ? "1px solid #5C5C5C"
                    : "none",
                borderRadius: "10%",
                "&:hover": {
                  backgroundColor: color.attributes.name.toLowerCase(),
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
