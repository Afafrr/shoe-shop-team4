import { render, screen, fireEvent } from "@testing-library/react";
import MenuModal from "@/app/(with-navbar)/(profile)/my-products/_components/MenuModal";
import { Selected } from "@/app/(with-navbar)/(profile)/my-products/_components/MyProductsClient";
import { useRouter } from "next/navigation";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("MenuModal", () => {
  const setSelected = jest.fn();
  const onDelete = jest.fn();
  const productId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the ThreeDotsIcon", () => {
    render(
      <MenuModal
        productId={productId}
        setSelected={setSelected}
        onDelete={onDelete}
      />
    );
  });

  it("checks if ThreeDotsIcon is rendered and opens the menu when the icon is clicked ", () => {
    render(
      <MenuModal
        productId={productId}
        setSelected={setSelected}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByLabelText("more"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByLabelText("more")).toBeInTheDocument();
  });

  it("calls the correct action when 'View' is clicked", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <MenuModal
        productId={productId}
        setSelected={setSelected}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByLabelText("more"));
    fireEvent.click(screen.getByText("View"));

    expect(push).toHaveBeenCalledWith(`./products/${productId}`);
  });

  it("calls the correct action when 'Edit' is clicked", () => {
    render(
      <MenuModal
        productId={productId}
        setSelected={setSelected}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByLabelText("more"));
    fireEvent.click(screen.getByText("Edit"));

    expect(setSelected).toHaveBeenCalledWith({ id: productId, action: "edit" });
  });

  it("calls the correct action when 'Duplicate' is clicked", () => {
    render(
      <MenuModal
        productId={productId}
        setSelected={setSelected}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByLabelText("more"));
    fireEvent.click(screen.getByText("Duplicate"));

    expect(setSelected).toHaveBeenCalledWith({
      id: productId,
      action: "duplicate",
    });
  });

  it("opens the delete confirmation modal when 'Delete' is clicked", () => {
    render(
      <MenuModal
        productId={productId}
        setSelected={setSelected}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByLabelText("more"));
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Delete product")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledWith(productId);
  });
});
