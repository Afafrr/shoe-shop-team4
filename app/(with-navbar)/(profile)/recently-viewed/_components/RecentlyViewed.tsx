"use client";
import { Grid } from "@mui/material";
import NoProductsInfo from "@/app/(with-navbar)/_components/NoProductsInfo";
import { useRecently } from "@/contexts/RecentlyViewed";
import { useRouter } from "next/navigation";
import ProductCollection from "../../_components/ProductCollection";
import ProductPreview from "@/components/Products/ProductPreview";

export default function RecentlyViewed() {
  const router = useRouter();
  const { getRecentItems } = useRecently();
  const recentItems = getRecentItems();

  const handleBrowseBtn = () => {
    router.push("/");
  };

  return (
    <ProductCollection title="Recently Viewed">
      {recentItems.length ? (
        recentItems.map((product) => {
          // format RecentlyViewedCard type object into ProductPreview type.
          const { id, viewedAt, productId, ...filteredProd } = product;
          const formattedProd = {
            ...filteredProd,
            id: productId,
          };
          return (
            <Grid key={product.id} item xs={1} sx={{ position: "relative" }}>
              <ProductPreview product={formattedProd} />
            </Grid>
          );
        })
      ) : (
        <NoProductsInfo
          onBtnClick={handleBrowseBtn}
          title="You have not viewed any products recently"
          subtitle="Browse the homepage and find products of your preference"
          btnDescription="Browse products"
        />
      )}
    </ProductCollection>
  );
}
