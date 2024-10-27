import { render } from "@testing-library/react";
import ProductDetailItemSkeleton from "@/app/(with-navbar)/(profile)/order-history/_components/details/ProductDetailItemSkeleton";

describe("ProductDetailItemSkeleton component", () => {
  it("renders the skeletons with correct structure", () => {
    const { container } = render(<ProductDetailItemSkeleton />);
    const skeletonElements = container.querySelectorAll(".MuiSkeleton-root");
    expect(skeletonElements.length).toBe(6);
  });

  it("applies the correct Box layout styles", () => {
    const { container } = render(<ProductDetailItemSkeleton />);

    const boxElement = container.querySelector("div");
    expect(boxElement).toHaveStyle({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
    });
  });
});
