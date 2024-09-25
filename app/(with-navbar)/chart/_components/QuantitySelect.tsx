import { useState } from "react";

import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
  SelectChangeEvent,
  Divider,
} from "@mui/material";

import { useCart } from "@/contexts/Cart";

const QuantitySelect = ({ item }: { item: any }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { updateItemQuantity } = useCart();

  const handleChange = (event: SelectChangeEvent<number>) => {
    updateItemQuantity(item.id, event.target.value as number);
  };

  return isMdUp ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        mb: "2px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "9px" }}>
        <IconButton
          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <SvgIcon>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#E8E8E8" />
              <rect
                x="22"
                y="15"
                width="2"
                height="12"
                rx="1"
                transform="rotate(90 22 15)"
                fill="#CECECE"
              />
            </svg>
          </SvgIcon>
        </IconButton>

        <Typography fontWeight={400} sx={{ userSelect: "none" }}>
          {item.quantity}
        </Typography>

        <IconButton
          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= 10}
        >
          <SvgIcon>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#FFD7D6" />
              <rect x="15" y="10" width="2" height="12" rx="1" fill="#FE645E" />
              <rect x="10" y="15" width="12" height="2" rx="1" fill="#FE645E" />
            </svg>
          </SvgIcon>
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "17px",
          ml: "17px",
          mr: "16px",
        }}
      >
        <Typography
          fontWeight={400}
          color={"#494949"}
          sx={{ userSelect: "none" }}
        >
          Quantity
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ color: "#8B8E93" }} />
      </Box>
    </Box>
  ) : (
    <FormControl variant="outlined">
      <InputLabel id="quantity-select-label">Quantity</InputLabel>
      <Select
        labelId="quantity-select-label"
        id="quantity-select"
        name="quantity"
        value={item.quantity}
        onChange={handleChange}
        label="Quantity"
        sx={{
          height: "40px",
          width: "100px",
        }}
      >
        {[...Array(10)].map((_, i) => (
          <MenuItem key={i + 1} value={i + 1}>
            {i + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default QuantitySelect;
