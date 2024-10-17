import ProductCollection from "@/app/(with-navbar)/(profile)/_components/ProductCollection";
import { render, screen } from "@testing-library/react";
import ProductPreview, {
  ProductPreviewType,
} from "@/components/Products/ProductPreview";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/my-products"),
}));

const products: ProductPreviewType[] = [
  {
    id: 1234,
    name: "Mock Product",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
  {
    id: 1235,
    name: "Mock Product 1",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
  {
    id: 1236,
    name: "Mock Product 2",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
  {
    id: 1237,
    name: "Mock Product 3",
    gender: "male",
    price: 1232,
    imageUrl: "",
  },
];

describe("Product Collection Component", () => {
  it("renders main component", () => {
    render(<ProductCollection title="My Test">lorem ipsum</ProductCollection>);
    // check main component is rendered by fetching the title
    expect(screen.getByText("My Test")).toBeInTheDocument();
  });
  it("renders products", () => {
    render(
      <ProductCollection title="My Test">
        {products.map((product) => {
          return <ProductPreview product={product} key={product.id} />;
        })}
      </ProductCollection>
    );
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
