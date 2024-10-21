import dynamic from "next/dynamic";

const DynamicCartProvider = dynamic(
  () => import("@/contexts/Cart").then((module) => module.CartProvider),
  {
    ssr: false,
  }
);
export const DynamicWishlistProvider = dynamic(
  () => import("@/contexts/Wishlist").then((module) => module.WishlistProvider),
  {
    ssr: false,
  }
);

export const DynamicRecentlyProvider = dynamic(
  () =>
    import("@/contexts/RecentlyViewed").then(
      (module) => module.RecentlyProvider
    ),
  {
    ssr: false,
  }
);

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicWishlistProvider>
      <DynamicRecentlyProvider>
        <DynamicCartProvider>{children}</DynamicCartProvider>
      </DynamicRecentlyProvider>
    </DynamicWishlistProvider>
  );
}
