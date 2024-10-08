"use client";
import { Grid } from "@mui/material";
import NoProductsInfo from "@/app/(with-navbar)/_components/NoProductsInfo";
import { useWishlist } from "@/contexts/Wishlist";
import { useRouter } from "next/navigation";
import WishlistItemCard from "./WishlistItemCard";
import ProductCollection from "../../_components/ProductCollection";

export default function Wishlist() {
  const router = useRouter();
  const { wishlistItems } = useWishlist();

  const handleBrowseBtn = () => {
    router.push("/");
  };

  return (
    <ProductCollection title="My Wishlist">
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
    </ProductCollection>
  );
}
