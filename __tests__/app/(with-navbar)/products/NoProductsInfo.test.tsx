import { render, screen } from "@testing-library/react";
import NoProductsInfo from "@/app/(with-navbar)/_components/NoProductsInfo";
import { fireEvent } from "@testing-library/react";

describe("Page", () => {
  jest.fn();
  it("renders", () => {
    render(
      <NoProductsInfo
        title="You have seen all the items"
        subtitle="Feel free to go back to the top to review."
        btnDescription="Go to top"
        onBtnClick={() => {}}
      />
    );
    expect(screen.getByText("You have seen all the items")).toBeInTheDocument();
  });
  it("click", () => {
    const onClick = jest.fn();
    render(
      <NoProductsInfo
        title="You have seen all the items"
        subtitle="Feel free to go back to the top to review."
        btnDescription="Go to top"
        onBtnClick={onClick}
      />
    );
    const button = screen.getByText("Go to top");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
