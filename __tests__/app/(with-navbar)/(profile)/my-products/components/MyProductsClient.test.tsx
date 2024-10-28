import React from "react";
import { render, screen } from "@testing-library/react";
import MyProductsClient from "@/app/(with-navbar)/(profile)/my-products/_components/MyProductsClient";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/components/Products/ProductCard", () => ({
  __esModule: true,
  default: ({ name, price }: { name: string; price: string }) => (
    <div>
      <p>ProductCard</p>
      <p>{name}</p>
      <p>{price}</p>
    </div>
  ),
}));
jest.mock(
  "@/app/(with-navbar)/(profile)/my-products/_components/modals/duplicate/DuplicateModal",
  () => ({
    __esModule: true,
    default: () => <div>DuplicateModal</div>,
  })
);
jest.mock(
  "@/app/(with-navbar)/(profile)/my-products/_components/modals/edit-modal/EditModal",
  () => ({
    __esModule: true,
    default: () => <div>EditModal</div>,
  })
);
jest.mock("@/utils/getData", () => ({
  getData: jest.fn(),
}));
jest.mock("@/app/(with-navbar)/(profile)/my-products/action", () => ({
  deleteProduct: jest.fn(),
}));

describe("MyProductsClient", () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { data: null },
    });
  });

  it("renders loading state initially", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });
    render(<MyProductsClient />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message on error", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: { message: "Error fetching data" },
      isLoading: false,
    });
    render(<MyProductsClient />);
    expect(screen.getByText("Error fetching data")).toBeInTheDocument();
  });

  it("renders products when data is available", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        data: {
          products: [
            {
              id: 1,
              name: "Product 1",
              price: 100,
            },
          ],
        },
      },
      error: null,
      isLoading: false,
    });
    render(<MyProductsClient />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("handles empty state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });
    render(<MyProductsClient />);
    expect(
      screen.getByText("You don't have any products yet")
    ).toBeInTheDocument();
  });
});
