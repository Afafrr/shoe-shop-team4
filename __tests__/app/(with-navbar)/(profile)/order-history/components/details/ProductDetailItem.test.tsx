import ProductDetailItem from "@/app/(with-navbar)/(profile)/order-history/_components/details/ProductDetailItem";
import { render, screen } from "@testing-library/react";

describe("ProductDetailItem component", () => {
  const product = {
    size: 42,
    quantity: 2,
    id: 1,
    name: "Running Shoes",
    price: 150,
    gender: "Men",
    imageUrl: "/shoe.jpg",
  };

  it("renders the product name, gender, size, quantity, and price", () => {
    render(<ProductDetailItem product={product} />);

    expect(screen.getByText("Running Shoes")).toBeInTheDocument();

    expect(screen.getByText("Men's Shoes")).toBeInTheDocument();

    expect(screen.getByText("Size: EU-42")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("150$")).toBeInTheDocument();
  });

  it("renders the product image correctly", () => {
    render(<ProductDetailItem product={product} />);

    const image = screen.getByAltText("Running Shoes");
    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute("src", expect.stringMatching(/shoe/i));
  });

  it("handles missing image gracefully", () => {
    const productWithoutImage = {
      ...product,
      imageUrl: null,
    };

    render(<ProductDetailItem product={productWithoutImage} />);

    const image = screen.getByAltText("Running Shoes");
    expect(image).toHaveAttribute("alt", expect.stringMatching(/shoe/i));
  });

  it("renders 'Unisex Shoes' if gender is not provided", () => {
    const productWithoutGender = {
      ...product,
      gender: "",
    };

    render(<ProductDetailItem product={productWithoutGender} />);

    expect(screen.getByText("Unisex Shoes")).toBeInTheDocument();
  });
});
