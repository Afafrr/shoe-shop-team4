import { RecentlyProvider, useRecently } from "@/contexts/RecentlyViewed";
import { fireEvent, render, screen } from "@testing-library/react";
import RecentlyViewed from "@/app/(with-navbar)/(profile)/recently-viewed/_components/RecentlyViewed";
import { useEffect, useState } from "react";
import { ProductCardType } from "@/types/Product";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/my-products"),
}));

describe("RecentlyViewed Component", () => {
  // Wrapper component to add, remove and get items from recentlyViewedItems
  const Wrapper = () => {
    const { getRecentItems, addItem, removeItem } = useRecently();
    const [products, setProducts] = useState(mockProducts);
    const [count, setCount] = useState(0);

    // Clear all Products
    useEffect(() => {
      getRecentItems().forEach((item) => {
        removeItem(item.id);
      });
    }, []);

    // Adds item to recentlyViewedItems
    function handleClick() {
      let productToAdd = products[count];
      // If no product, create a new one
      if (!productToAdd) {
        productToAdd = createProduct(products);
        setProducts((prevList) => [...prevList, productToAdd]);
      }
      addItem(productToAdd);
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
  it("renders", () => {
    // Render the component
    render(
      <RecentlyProvider>
        <RecentlyViewed />
      </RecentlyProvider>
    );

    // Test if the title is rendered
    expect(screen.getByText("Recently Viewed")).toBeInTheDocument();
  });
  it("renders NoProductsInfo when no items in storage", () => {
    render(
      <RecentlyProvider>
        <RecentlyViewed />
      </RecentlyProvider>
    );
    expect(
      screen.getByText("You have not viewed any products recently")
    ).toBeInTheDocument();
  });
  it("renders products correctly when list is not empty", () => {
    render(
      <RecentlyProvider>
        <Wrapper />
      </RecentlyProvider>
    );
    // Get div to manage recentlyViewedItems
    const exposer = screen.getByTestId("recently-exposer");
    expect(exposer.innerHTML).toBe("0");
    // Add items to recentlyViewedItems
    mockProducts.forEach(() => {
      fireEvent.click(exposer);
    });
    // Expect list to have length 4
    expect(exposer.innerHTML).toBe("4");
    // Expect RecentlyViewed component to have rendered ProductPreview cards
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
  it("removes older products when the limit of recently viewed products(15) is exceeded", () => {
    render(
      <RecentlyProvider>
        <Wrapper />
      </RecentlyProvider>
    );
    // Get div to manage recentlyViewedItems
    const exposer = screen.getByTestId("recently-exposer");
    expect(exposer.innerHTML).toBe("0");

    // Add 15 items(limit) to recentlyViewedItems
    for (let i = 0; i < 15; i++) {
      fireEvent.click(exposer);
    }
    expect(exposer.innerHTML).toBe("15");
    for (let i = 1; i <= 15; i++) {
      const item = screen.queryByText(`Mock Product ${i}`);
      expect(item).toBeInTheDocument();
    }

    // Based on how the mockProduct are created, the last added item should have `name` of 'Mock Product 15'.
    // So 'Mock Product 16' should not be on screen.
    const lastItem = screen.queryByText("Mock Product 16");
    expect(lastItem).not.toBeInTheDocument();
    // Oldest item should be 'Mock Product 1', first we check it is on screen.
    // Then, Adding 'Mock Product 16' should delete it from our screen.
    let oldestItem = screen.queryByText("Mock Product 1");
    expect(oldestItem).toBeInTheDocument();
    // Now we add 'Mock Product 16' by adding a new product to the list by clicking the exposer.
    fireEvent.click(exposer);
    // Check 'Mock Product 16' has been added
    const newItem = screen.queryByText("Mock Product 16");
    expect(newItem).toBeInTheDocument();
    // check `Mock Product 1` has been deleted.
    oldestItem = screen.queryByText("Mock Product 1");
    expect(oldestItem).not.toBeInTheDocument();
  });
});

const mockProducts: ProductCardType[] = [
  {
    productId: 1234,
    name: "Mock Product 1",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
  {
    productId: 1235,
    name: "Mock Product 2",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
  {
    productId: 1236,
    name: "Mock Product 3",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
  {
    productId: 1237,
    name: "Mock Product 4",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
];

// Creates a new product by adding to a list a product with `id` = lastProduct[id] + 1, and `name` = `Mock Product ${newLength}`
function createProduct(list: ProductCardType[]) {
  const lastProduct = list[list.length - 1];
  const mockNumber = list.length + 1;
  return {
    ...lastProduct,
    productId: lastProduct.productId + 1,
    name: `Mock Product ${mockNumber}`,
  };
}
