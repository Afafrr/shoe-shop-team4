import { render, screen } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import errorToast from "@/components/Alerts/errorToast";
import ProductsDetails from "@/app/(with-navbar)/(profile)/order-history/_components/details/ProductsDetails";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/app/(with-navbar)/(profile)/order-history/_lib/utils", () => ({
  getProductsForOrders: jest.fn(),
  getProductInfo: jest.fn(),
}));

jest.mock("@/components/Alerts/errorToast", () => jest.fn());

jest.mock(
  "@/app/(with-navbar)/(profile)/order-history/_components/details/ProductDetailItemSkeleton",
  () => () => <div data-testid="mock-skeleton">Loading...</div> // Change to default export
);

const mockProducts = [
  { id: 1, size: 3, quantity: 2 },
  { id: 2, size: 4, quantity: 1 },
];

describe("ProductsDetails", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading skeletons when loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<ProductsDetails products={mockProducts} />);

    const loadingSkeletons = screen.getAllByText(/loading/i);
    expect(loadingSkeletons.length).toBeGreaterThan(0);
  });

  it("shows an error toast when there is an error", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Error fetching data"),
      data: null,
    });

    render(<ProductsDetails products={mockProducts} />);

    expect(errorToast).toHaveBeenCalledWith(
      "Something went wrong getting your details"
    );
  });

  it("renders product details when data is fetched", () => {
    const mockProductData = [
      { id: 1, name: "Product 1", price: 20, gender: "Mem", imageUrl: null },
      { id: 2, name: "Product 2", price: 30, gender: "Woman", imageUrl: null },
    ];

    jest
      .requireMock("@/app/(with-navbar)/(profile)/order-history/_lib/utils")
      .getProductInfo.mockImplementation((product: any) => {
        return mockProductData.find((item) => item.id === product.id);
      });

    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: mockProducts },
    });

    render(<ProductsDetails products={mockProducts} />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
