import { WishlistProvider } from "@/contexts/Wishlist";
import { render, screen } from "@testing-library/react";
import MyWishlist from "@/app/(with-navbar)/(profile)/my-wishlist/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/my-products"),
}));

describe("Wishlist Component", () => {
  it("renders", () => {
    render(
      <WishlistProvider>
        <MyWishlist />
      </WishlistProvider>
    );
    // Check page's main container is rendered
    expect(screen.getByTestId("my-wishlist-page")).toBeInTheDocument();
    // Check Wishlist Title is rendered
    expect(screen.getByText("My Wishlist")).toBeInTheDocument();
  });
});
