import ProductContainer from "@/components/Products/ProductContainer";
import { render, screen } from "@testing-library/react";

describe("ProductContainer component", () => {
  it("renders children correctly", () => {
    render(
      <ProductContainer>
        <div data-testid="product-item">Product Item</div>
      </ProductContainer>
    );

    const childElement = screen.getByTestId("product-item");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Product Item");
  });

  it("applies the correct grid properties", () => {
    render(
      <ProductContainer>
        <div data-testid="product-item">Product Item</div>
      </ProductContainer>
    );

    const gridElement = screen.getByTestId("product-item").parentElement;
    expect(gridElement).toHaveAttribute(
      "class",
      expect.stringContaining("MuiGrid2-grid-xs-6")
    );
    expect(gridElement).toHaveAttribute(
      "class",
      expect.stringContaining("MuiGrid2-grid-sm-4")
    );
    expect(gridElement).toHaveAttribute(
      "class",
      expect.stringContaining("MuiGrid2-grid-md-4")
    );
    expect(gridElement).toHaveAttribute(
      "class",
      expect.stringContaining("MuiGrid2-grid-lg-3")
    );
  });
});
