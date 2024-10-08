import { useWishlist, WishlistProvider } from "@/contexts/Wishlist";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WishlistItemCard from "@/app/(with-navbar)/(profile)/my-wishlist/_components/WishlistItemCard";
import { WishlistItem } from "@/contexts/Wishlist";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const product: WishlistItem = {
  id: "1",
  productId: 1234,
  name: "Mock Product",
  gender: "male",
  price: 1232,
  imageUrl: "",
};

describe("Wishlist Item Component", () => {
  it("renders", () => {
    render(
      <WishlistProvider>
        <WishlistItemCard product={product} />
      </WishlistProvider>
    );
    // check top container is rendered
    expect(
      screen.getByTestId("wishlist-item-container-1234")
    ).toBeInTheDocument();
    // check ProductCard component is rendered by fetching product name in screen
    expect(screen.getByText("Mock Product")).toBeInTheDocument();
    // check RemoveItem component is rendered by fetching its data-testid
    expect(screen.getByTestId("remove-item-test")).toBeInTheDocument();
  });
  it("removes item when unfav icon is clicked", async () => {
    // This component exposes the value of wishlistItems to test adding and removing items.
    // Otherwise, wishlistItems and the effects of removeItem functionality would be unaccessible.
    const Wrapper = () => {
      const { wishlistItems, addItem } = useWishlist();
      const { id, ...newProduct } = product;
      function handleClick() {
        addItem(newProduct);
      }

      return (
        <>
          <div data-testid="wishlist-exposer" onClick={handleClick}>
            {wishlistItems.length}
          </div>
          {wishlistItems.map((item) => {
            return <WishlistItemCard key={item.id} product={item} />;
          })}
        </>
      );
    };

    render(
      <WishlistProvider>
        <Wrapper />
      </WishlistProvider>
    );
    const exposer = screen.getByTestId("wishlist-exposer");
    expect(exposer).toBeInTheDocument();

    // Add product to wishlistItems to test the removal by click.
    fireEvent.click(exposer);
    expect(screen.getByTestId("wishlist-exposer")).toHaveTextContent("1");
    // Check wishlistItem has been rendered
    expect(
      screen.getByTestId("wishlist-item-container-1234")
    ).toBeInTheDocument();

    // Get removeItemComponent and fire a click
    const removeItemComponent = screen.getByTestId("remove-item-test");
    fireEvent.click(removeItemComponent);

    // Check product is deleted from wishlistItems
    expect(screen.getByTestId("wishlist-exposer")).toHaveTextContent("0");
  });
});
