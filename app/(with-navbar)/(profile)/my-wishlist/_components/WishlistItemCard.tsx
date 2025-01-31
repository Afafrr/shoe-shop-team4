"use client";
import ProductPreview, {
  ProductPreviewType,
} from "@/components/Products/ProductPreview";
import RemoveItem from "./RemoveItem";
import { useWishlist, WishlistItem } from "@/contexts/Wishlist";
import { Box } from "@mui/material";

type Props = {
  product: WishlistItem;
};
export default function WishlistItemCard({ product }: Props) {
  const { removeItem } = useWishlist();

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const { id, productId, ...restProduct } = product;
  const previewProduct: ProductPreviewType = {
    ...restProduct,
    id: productId,
  };

  return (
    <Box data-testid={`wishlist-item-container-${productId}`}>
      <ProductPreview product={previewProduct} />
      <RemoveItem handleClick={() => handleRemove(product.id)} />
    </Box>
  );
}
