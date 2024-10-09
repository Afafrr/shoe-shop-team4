import { UserDataProvider } from "@/contexts/UserDataProvider";
import { RecentlyProvider, useRecently } from "@/contexts/RecentlyViewed";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockUserData } from "../../my-wishlist/page.test";
import RecentlyViewed from "@/app/(with-navbar)/(profile)/recently-viewed/_components/RecentlyViewed";
import { useState } from "react";
import { ProductCardType } from "@/types/Product";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/my-products"),
}));

describe("RecentlyViewed Component", () => {
  it("renders", () => {
    // Render the component
    render(
      <UserDataProvider data={mockUserData}>
        <RecentlyProvider>
          <RecentlyViewed />
        </RecentlyProvider>
      </UserDataProvider>
    );

    // Test if the title is rendered
    expect(screen.getByText("Recently Viewed")).toBeInTheDocument();
  });
  it("renders NoProductsInfo when no items in storage", () => {
    render(
      <UserDataProvider data={mockUserData}>
        <RecentlyProvider>
          <RecentlyViewed />
        </RecentlyProvider>
      </UserDataProvider>
    );
    expect(
      screen.getByText("You have not viewed any products recently")
    ).toBeInTheDocument();
  });
  it("renders products correctly when list is not empty", () => {
    const Wrapper = () => {
      const { getRecentItems, addItem } = useRecently();
      const [count, setCount] = useState(0);
      // Adds item to recentlyViewedItems
      function handleClick() {
        if (count == 4) return;
        addItem(products[count]);
        setCount((prevCount) => prevCount + 1);
      }

      return (
        <>
          {/* Shows length of recentlyViewedItems and adds to it on click */}
          <div data-testid="recently-exposer" onClick={handleClick}>
            {getRecentItems().length}
          </div>
          <RecentlyViewed />
        </>
      );
    };

    render(
      <UserDataProvider data={mockUserData}>
        <RecentlyProvider>
          <Wrapper />
        </RecentlyProvider>
      </UserDataProvider>
    );
    // Get div to manage recentlyViewedItems
    const exposer = screen.getByTestId("recently-exposer");
    expect(exposer.innerHTML).toBe("0");
    // Add items to recentlyViewedItems
    products.forEach(() => {
      fireEvent.click(exposer);
    });
    // Expect list to have length 4
    expect(exposer.innerHTML).toBe("4");
    // Expect RecentlyViewed component to have rendered ProductPreview cards
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});

const products: ProductCardType[] = [
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
