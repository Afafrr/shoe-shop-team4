import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import SearchForm from "@/app/(with-navbar)/_components/SearchForm";
import { act } from "react";

describe("SearchForm Component", () => {
  let handleDrawerToggle: jest.Mock;

  beforeEach(() => {
    handleDrawerToggle = jest.fn();
  });

  it("renders the search input with default value", () => {
    render(
      <SearchForm
        isDrawerOpen={false}
        defaultSearch="test"
        handleDrawerToggle={handleDrawerToggle}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search, hit enter/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("test");
  });

  it("focuses the search input when drawer is opened", () => {
    render(
      <SearchForm
        isDrawerOpen={true}
        defaultSearch="test"
        handleDrawerToggle={handleDrawerToggle}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search, hit enter/i);
    expect(searchInput).toHaveFocus();
  });

  it("submits the form and navigates to the correct URL", async () => {
    render(
      <SearchForm
        isDrawerOpen={true}
        defaultSearch=""
        handleDrawerToggle={handleDrawerToggle}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search, hit enter/i);

    // Simulate user typing a search query and pressing Enter
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "query" } });
      fireEvent.submit(searchInput);
    });

    // Check that router.push was called with the correct URL
    expect(useRouter().push).toHaveBeenCalledWith("/products?search=query");
  });

  it("shows validation error when submitting an empty search", async () => {
    render(
      <SearchForm
        isDrawerOpen={true}
        defaultSearch=""
        handleDrawerToggle={handleDrawerToggle}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search, hit enter/i);

    await act(async () => {
      fireEvent.submit(searchInput);
    });

    // Check for validation error message
    const errorMessage = await screen.findByText(/required/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
