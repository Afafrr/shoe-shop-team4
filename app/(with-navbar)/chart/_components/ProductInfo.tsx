import Image from "next/image";

import { Box, Button, Typography } from "@mui/material";

import { CartItem, useCart } from "@/contexts/Cart";
import QuantitySelect from "./QuantitySelect";
import { Delete } from "@/public/svg/Delete";
import useIsMobile from "../../(profile)/my-products/_components/useIsMobile";

export default function ProductInfo({ item }: { item: CartItem }) {
  const { removeItem } = useCart();
  const isMobile = useIsMobile();

  return (
    <Box
      key={item.id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        my: "30px",
        mx: "20px",
        gap: "15px",
      }}
    >
      <Box sx={{ width: "150px", height: "120px" }}>
        <Image
          src={item.image}
          alt={item.name}
          width={223}
          height={110}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: {
              md: "100%",
            },
          }}
        >
          <Box>
            <Typography fontWeight={500} noWrap sx={{ maxWidth: "150px" }}>
              {item.name}
            </Typography>
            <Typography
              fontWeight={500}
              fontSize={"12px"}
              color={"#5c5c5c"}
              noWrap
              sx={{ maxWidth: "150px" }}
            >
              {item.gender}
            </Typography>
          </Box>

          <QuantitySelect item={item} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            fontWeight={500}
            sx={{ alignSelf: "flex-end" }}
          >{`$${item.price}`}</Typography>

          <Button
            onClick={() => removeItem(item.id)}
            aria-label="delete"
            sx={{ color: "#8B8E93", gap: "4px", p: 0, mb: "10px" }}
          >
            <Delete />
            {!isMobile && <Typography>Delete</Typography>}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
