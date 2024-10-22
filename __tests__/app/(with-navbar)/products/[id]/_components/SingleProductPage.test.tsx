import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SingleProductPage from "@/app/(with-navbar)/products/[id]/_components/SingleProductPage";
import { PopulateField } from "@/utils/api/singleProduct";
import { CartProvider } from "@/contexts/Cart";
import { WishlistItem, WishlistProvider } from "@/contexts/Wishlist";
import {
  RecentlyProvider,
  RecentlyViewedCard,
  useRecently,
} from "@/contexts/RecentlyViewed";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { mockResponse, mockedColors } from "../../../../mockedFetch";
import { useEffect, useState } from "react";
import { ProductContextItem } from "@/types/Product";

// Create client context
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
const queryClient = getQueryClient();

// Specify fieldsToPopulate prop for SingleProductPage component
const fieldsToPopulate: PopulateField[] = [
  "images",
  "brand",
  "categories",
  "sizes",
  "gender",
  "color",
];

// Mock 'next/navigation' module, specifically useRouter and usePathname
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/my-products"),
}));

// Base url for backend requests
const BASE_URL = "https://shoes-shop-strapi.herokuapp.com/api";

describe("SingleProductPage component", () => {
  // Spy on `setItem` method of `localStorage` to see the calls made to it.
  const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
  // Function to find a key-value pair on the call list for `setItem` method.
  function callWasMade(key: string, expected: ProductContextItem) {
    const storageList = setItemSpy.mock.calls.filter((list) => list[0] == key);
    return storageList.some((item) => {
      const value = JSON.parse(item[1]);
      return value.length ? deepCompare(value[0], expected) : false;
    });
  }

  // Before all tests, reset all mocks and mock the fetch requests
  beforeAll(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse((req) => {
      if (req.url.startsWith(`${BASE_URL}/products`)) {
        return Promise.resolve(JSON.stringify(mockResponse));
      } else {
        return Promise.resolve(JSON.stringify(mockedColors));
      }
    });
    process.env.NEXT_PUBLIC_BASE_URL = BASE_URL;
  });
  // Before each test clear the local storage and the setItemPpy variable
  beforeEach(() => {
    localStorage.clear();
    setItemSpy.mockClear();
  });
  afterAll(() => {
    // Clean up the environment variable after tests
    delete process.env.NEXT_PUBLIC_BASE_URL;
  });

  it("fetches data and displays it", async () => {
    // Render the component
    render(
      <QueryClientProvider client={queryClient}>
        <RecentlyProvider>
          <WishlistProvider>
            <CartProvider>
              <SingleProductPage
                productId="1443"
                fieldsToPopulate={fieldsToPopulate}
              />
            </CartProvider>
          </WishlistProvider>
        </RecentlyProvider>
      </QueryClientProvider>
    );

    // Wait for the component to finish fetching the data
    await waitFor(() => {
      // expect mock product to have been rendered
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Ensure fetch was called with the correct endpoint
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/products/1443?populate=images,brand,categories,sizes,gender,color`,
      { headers: { "Content-Type": "application/json" } }
    );

    // Expect mock product to have been rendered
    expect(screen.getByText("Converse shoe 890")).toBeInTheDocument();
  });

  it("stores product data in local storage under `recent_${userId}` key when mounted", async () => {
    // Wrapper component that allows to get items from local storage
    const Wrapper = () => {
      const { getRecentItems, removeItem } = useRecently();
      const [items, setItems] = useState<RecentlyViewedCard[]>([]);
      // state to be set to true after an item has been retrieved from local storage
      const [update, setUpdate] = useState<boolean>(true);

      // Clear all Products
      useEffect(() => {
        // Remove any previous items from local storage
        getRecentItems().forEach((item) => {
          removeItem(item.id);
        });
      }, []);

      function getItem() {
        setItems(getRecentItems());
        setUpdate(true);
      }

      return (
        <>
          {/* Shows the value of the first item on local storage under the `key` = `recent` */}
          <div data-testid="recently-exposer" onClick={getItem}>
            {update ? JSON.stringify(items[0]) : "no update"}
          </div>
          <SingleProductPage
            productId="1"
            fieldsToPopulate={fieldsToPopulate}
          />
        </>
      );
    };
    // Render the component
    render(
      <QueryClientProvider client={queryClient}>
        <RecentlyProvider>
          <WishlistProvider>
            <CartProvider>
              <Wrapper />
            </CartProvider>
          </WishlistProvider>
        </RecentlyProvider>
      </QueryClientProvider>
    );

    // Wait for fetch to have been completed and loading component removed.
    const loading = screen.queryByText("Loading...");
    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    // Expect `setItem` method from localStorage to have been called with key = `recent_${userId}`, with userId being mocked to '1'.
    expect(setItemSpy).toHaveBeenCalledWith("recent_1", expect.any(String));
    // Expect the value of the `setItem` call to have been an array of length 1 with the only item equal to
    // our mock product formatted to type RecentlyViewedCard.
    const recentStorage: RecentlyViewedCard[] = [
      {
        gender: "Women's Shoes",
        id: "1443",
        imageUrl:
          "https://res.cloudinary.com/devc11z9p/image/upload/v1726604073/shoes_log_in_fe2053ea1d.png",
        name: "Converse shoe 890",
        price: 3114,
        productId: 1443,
        viewedAt: expect.any(Number),
      },
    ];
    // Check that at least one of the calls made to 'localStorage.setItem' has our product as Value
    expect(callWasMade("recent_1", recentStorage[0])).toBe(true);

    // Check a different mock product evaluates to false
    const modifiedProduct = { ...recentStorage[0], gender: "Unisex" };
    expect(callWasMade("recent_1", modifiedProduct)).toBe(false);

    // Check item stored in local storage is our expected mock product
    // Component in wrapper with data-testid of `recently-exposer` prints on screen the value of the first item on the local storage
    // That first item should be our mock product
    const exposer = screen.getByTestId("recently-exposer");
    // Refresh data
    fireEvent.click(exposer);
    // Wait for state update
    await waitFor(() => {
      expect(exposer.innerHTML).not.toBe("no update");
    });
    // deep compare between local storage item and our mockProduct in recentStorage
    const equality = deepCompare(
      JSON.parse(exposer.innerHTML),
      recentStorage[0]
    );
    // expect items to have evaluated to true
    expect(equality).toBe(true);
  });
  it("stores product in `wishlist` list on local storage on button click", async () => {
    // Render the component
    render(
      <QueryClientProvider client={queryClient}>
        <RecentlyProvider>
          <WishlistProvider>
            <CartProvider>
              <SingleProductPage
                fieldsToPopulate={fieldsToPopulate}
                productId="1443"
              />
            </CartProvider>
          </WishlistProvider>
        </RecentlyProvider>
      </QueryClientProvider>
    );

    // Wait for fetch to have been completed and loading component removed.
    const loading = screen.queryByText("Loading...");
    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    // Get 'Add to Wishlist' button and fire a click event
    const addButton = screen.getByText("Add to Wishlist");
    fireEvent.click(addButton);

    // Expect `setItem` to have been called with `key` = `wishlist` and `value` equal to our mock product formatted to WishlistItem type:
    const wishlistStorage: WishlistItem[] = [
      {
        gender: "Women's Shoes",
        id: "1443",
        imageUrl:
          "https://res.cloudinary.com/devc11z9p/image/upload/v1726604073/shoes_log_in_fe2053ea1d.png",
        name: "Converse shoe 890",
        price: 3114,
        productId: 1443,
      },
    ];
    // Check that at least one of the calls made to 'localStorage.setItem' has our product as Value
    // and key equal to `wishlist_${userId}` where userId in this case is '1'
    expect(callWasMade("wishlist_1", wishlistStorage[0])).toBe(true);
  });
});

// Function to deeply compare two objects of type RecentlyViewedCard.
function deepCompare(actual: ProductContextItem, expected: ProductContextItem) {
  return (
    actual.gender === expected.gender &&
    actual.id === expected.id &&
    actual.imageUrl === expected.imageUrl &&
    actual.name === expected.name &&
    actual.price === expected.price &&
    actual.productId === expected.productId
  );
}
