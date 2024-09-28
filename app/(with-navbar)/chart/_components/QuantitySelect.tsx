import { Box, IconButton, Typography, Divider } from "@mui/material";

import { useCart } from "@/contexts/Cart";
import useIsMobile from "../../(profile)/my-products/_components/useIsMobile";
import { Minus } from "@/public/svg/Minus";
import { Plus } from "@/public/svg/Plus";

export default function QuantitySelect({ item }: { item: any }) {
  const { updateItemQuantity } = useCart();
  const isLargeScreen = useIsMobile("lg");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        mb: "2px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: "2px", md: "9px" },
        }}
      >
        <IconButton
          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus size={18} />
        </IconButton>

        <Typography fontWeight={400} sx={{ userSelect: "none" }}>
          {item.quantity}
        </Typography>

        <IconButton
          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= 10}
        >
          <Plus size={18} />
        </IconButton>
      </Box>

      {!isLargeScreen && (
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
      )}
    </Box>
  );
}
