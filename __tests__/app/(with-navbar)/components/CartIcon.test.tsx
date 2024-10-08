import { render, screen } from "@testing-library/react";
import CartIcon from "@/app/(with-navbar)/_components/CartIcon";

describe("CartIcon", () => {
  test("renders without count", () => {
    render(<CartIcon />);

    const svgElement = screen.getByTestId("empty-cart-icon");
    expect(svgElement).toBeInTheDocument();
  });

  test("renders with a count of 0 (no number displayed)", () => {
    render(<CartIcon count={0} />);
    const svgElement = screen.getByTestId("empty-cart-icon");
    expect(svgElement).toBeInTheDocument();
    expect(screen.queryByText(/99\+|[0-9]/)).not.toBeInTheDocument();
  });

  test("renders with a count less than 10", () => {
    render(<CartIcon count={7} />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  test("renders with a count between 10 and 99", () => {
    render(<CartIcon count={45} />);
    expect(screen.getByText("45")).toBeInTheDocument();
  });

  test("renders with a count over 99 as '99+'", () => {
    render(<CartIcon count={150} />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });
});
