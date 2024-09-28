import Image from "next/image";

import { Box, Button, Typography } from "@mui/material";

import { CartItem, useCart } from "@/contexts/Cart";
import QuantitySelect from "./QuantitySelect";
import { Delete } from "@/public/svg/Delete";
import useIsMobile from "../../(profile)/my-products/_components/useIsMobile";
import NextMuiLink from "@/components/Profile/NextMuiLink";

type ProductInfoProps = {
  item: CartItem;
  showMessage: () => void;
  setEliminatedItem: (item: CartItem) => void;
};

export default function ProductInfo({
  item,
  showMessage,
  setEliminatedItem,
}: ProductInfoProps) {
  const { removeItem } = useCart();
  const isMobile = useIsMobile();
  const isSmallScreen = useIsMobile("sm");

  function handleDelete(item: CartItem) {
    showMessage();
    setEliminatedItem(item);
    removeItem(item.id);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        my: { xs: "15px", sm: "30px" },
        mx: { xs: "5px", sm: "20px" },
        gap: "15px",
      }}
    >
      {!isSmallScreen && (
        <Box
          sx={{
            width: { xs: "150px", md: "225px" },
            height: { xs: "120px", md: "180px" },
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={223}
            height={110}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      )}

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
            mb: "6px",
            width: {
              md: "100%",
            },
          }}
        >
          <Box>
            <NextMuiLink
              href={`/products/${item.productId}`}
              sx={{ textDecoration: "none" }}
            >
              <Typography
                fontWeight={500}
                sx={{ wordBreak: "break-word" }}
                color={"textPrimary"}
              >
                {item.name}
              </Typography>
              <Typography
                fontWeight={500}
                fontSize={"12px"}
                color={"textSecondary"}
              >
                {item.gender}
              </Typography>
            </NextMuiLink>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography fontWeight={500} fontSize={"12px"}>
              Color:
            </Typography>
            <Box
              sx={{
                height: 20,
                width: 40,
                backgroundColor: item.color.toLowerCase(),
                borderRadius: "10%",
              }}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              fontWeight={500}
              fontSize={"12px"}
              noWrap
              sx={{ maxWidth: "150px" }}
            >
              Size:
            </Typography>

            <Box>
              <Typography
                fontWeight={500}
                fontSize={"12px"}
                color={"textSecondary"}
                noWrap
              >{`EU-${item.size}`}</Typography>
            </Box>
          </Box>
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
          <Box display="flex" alignItems="center">
            <QuantitySelect item={item} />
            <Button
              onClick={() => handleDelete(item)}
              aria-label="delete"
              sx={{ color: "#5C5C5C", gap: "4px", p: 0 }}
            >
              <Delete />
              {!isMobile && <Typography>Delete</Typography>}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
