import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

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
};

export default function ColorSelector({
  colors,
  onSelect,
}: ColorSelectorProps) {
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

  const handleColorClick = (color: Color) => {
    setSelectedColorId(color.id);
    onSelect(color);
  };

  return (
    <Box sx={{ width: "100%", padding: "0" }}>
      <Typography variant="h6" gutterBottom>
        Color
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {colors.map((color) => {
          console.log("Rendering color with ID:", color.id); 
          return (
            <Button
              key={color.id}
              onClick={() => handleColorClick(color)}
              sx={{
                width: 40,
                height: 40,
                backgroundColor: color.attributes.name.toLowerCase(),
                border: selectedColorId === color.id ? "2px solid black" : "none",
                borderRadius: "10%",
                "&:hover": {
                  backgroundColor: color.attributes.name.toLowerCase(),
                },
              }}
            />
          )
        })}
      </Box>
    </Box>
  );
}
