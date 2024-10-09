import {
  NewWishlistItem,
  useWishlist,
  WishlistProvider,
} from "@/contexts/Wishlist";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Wishlist from "@/app/(with-navbar)/(profile)/my-wishlist/_components/Wishlist";
import { useState } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/my-products"),
}));

const products: NewWishlistItem[] = [
  {
    productId: 1234,
    name: "Mock Product",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
  {
    productId: 1235,
    name: "Mock Product 1",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
  {
    productId: 1236,
    name: "Mock Product 2",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
  {
    productId: 1237,
    name: "Mock Product 3",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
];

describe("Wishlist Component", () => {
  it("renders", () => {
    render(
      <WishlistProvider>
        <Wishlist />
      </WishlistProvider>
    );
    // check main component is rendered by fetching the title
    expect(screen.getByText("My Wishlist")).toBeInTheDocument();
  });
  it("shows NoProductsInfo component when wishlist is empty", () => {
    render(
      <WishlistProvider>
        <Wishlist />
      </WishlistProvider>
    );
    // check main component is rendered by fetching the title
    expect(
      screen.getByText("You don't have any products in your wishlist yet")
    ).toBeInTheDocument();
  });
  it("renders wishlistItem components when wishlistItems list is not empty", () => {
    // This wrapper mocks functionality to add products to wishlistItems context list.
    const Wrapper = () => {
      const { wishlistItems, addItem } = useWishlist();
      const [count, setCount] = useState(0);
      function handleClick() {
        if (count == 4) return;
        addItem(products[count]);
        setCount((prevCount) => prevCount + 1);
      }

      return (
        <>
          <div data-testid="wishlist-exposer" onClick={handleClick}>
            {wishlistItems.length}
          </div>
          <Wishlist />
        </>
      );
    };
    render(
      <WishlistProvider>
        <Wrapper />
      </WishlistProvider>
    );
    // fetch exposer
    const exposer = screen.getByTestId("wishlist-exposer");
    expect(exposer).toBeInTheDocument();

    // Check click adds one item
    fireEvent.click(exposer);
    expect(exposer).toHaveTextContent("1");
    // Check wishlistItemCard has been rendered
    expect(
      screen.getByTestId("wishlist-item-container-1234")
    ).toBeInTheDocument();

    // Check adding multiple items
    [0, 1, 2].forEach(() => {
      fireEvent.click(exposer);
    });
    expect(screen.getByTestId("wishlist-exposer")).toHaveTextContent("4");
    // Check the rendered items are correct
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    // Function to remove an item
    const removeProduct = (product: HTMLElement) => {
      // Get function to find by `testid` only in the scope of `product`
      const { getByTestId } = within(product);
      const removeProduct = getByTestId("remove-item-test");
      // Click removeIcon of product
      fireEvent.click(removeProduct);
      expect(product).not.toBeInTheDocument();
    };

    // Check removing one item
    const firstItem = screen.getByTestId("wishlist-item-container-1234");
    removeProduct(firstItem);
    expect(exposer).toHaveTextContent("3");

    // Remove all products
    ["1235", "1236", "1237"].forEach((productId) => {
      const product = screen.getByTestId(
        `wishlist-item-container-${productId}`
      );
      removeProduct(product);
    });
    expect(exposer).toHaveTextContent("0");
    // expect no removeIcons to be on screen. Meaning, no wishlistItemCards
    expect(screen.queryByTestId("remove-item-test")).not.toBeInTheDocument();
  });
});
