import RemoveItem from "@/app/(with-navbar)/(profile)/my-wishlist/_components/RemoveItem";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Remove Item Component", () => {
  it("renders", () => {
    render(<RemoveItem handleClick={() => {}} />);
    expect(screen.getByTestId("remove-item-test")).toBeInTheDocument();
    expect(screen.getByTestId("remove-icon-test")).toBeInTheDocument();
  });
  it("calls fn on click", () => {
    const onClick = jest.fn();
    render(<RemoveItem handleClick={onClick} />);
    const iconContainer = screen.getByTestId("remove-item-test");
    fireEvent.click(iconContainer);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("changes color on hover", () => {
    render(<RemoveItem handleClick={() => {}} />);
    const iconContainer = screen.getByTestId("remove-item-test");
    const svg_paths = screen.getAllByTestId("icon-path");

    //Function to check fill property on the svg path tags
    const checkSvgColor = (color: string) => {
      svg_paths.forEach((path) => {
        expect(path).toHaveAttribute("fill", color);
      });
    };
    //check initial color is grey
    checkSvgColor("grey");
    //check color while hover is red
    fireEvent.mouseEnter(iconContainer);
    checkSvgColor("red");
    //check color returns to grey after mouse leaves
    fireEvent.mouseLeave(iconContainer);
    checkSvgColor("grey");
  });
});
