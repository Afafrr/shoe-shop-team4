"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import NoProductsInfo from "@/app/(with-navbar)/_components/NoProductsInfo";
import "../wishlist.css";
import { useWishlist } from "@/contexts/Wishlist";
import { useRouter } from "next/navigation";
import WishlistItemCard from "./WishlistItemCard";

export default function Wishlist() {
  const router = useRouter();
  const { wishlistItems } = useWishlist();

  const handleBrowseBtn = () => {
    router.push("/");
  };

  return (
    <Stack
      width={"100%"}
      padding={"20px"}
      spacing={5}
      data-testid="wishlist-component"
    >
      <Box paddingLeft={"20px"}>
        <Typography
          variant="h4"
          fontWeight={500}
          fontSize={{ xs: "30px", md: "45px" }}
          sx={{
            mt: { xs: "8px", md: "15px" },
            position: "relative",
          }}
        >
          My Wishlist
        </Typography>
      </Box>
      <Grid container columns={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
        {wishlistItems.length ? (
          wishlistItems.map((product) => {
            return (
              <Grid key={product.id} item xs={1} sx={{ position: "relative" }}>
                <WishlistItemCard product={product} />
              </Grid>
            );
          })
        ) : (
          <NoProductsInfo
            onBtnClick={handleBrowseBtn}
            title="You don't have any products in your wishlist yet"
            subtitle="Browse the homepage and find products of your preference"
            btnDescription="Browse products"
          />
        )}
      </Grid>
    </Stack>
  );
}
