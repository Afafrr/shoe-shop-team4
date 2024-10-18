import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import SearchInput from "@/app/(with-navbar)/_components/searchInput";
import theme from "@/theme";
import { act } from "react";
import { useMediaQuery } from "@mui/material";

jest.mock("@mui/material/useMediaQuery", () => jest.fn());

describe("SearchInput Component", () => {
  it("renders the Search button on desktop screens", () => {
    (useMediaQuery as jest.Mock).mockImplementationOnce(() => false);

    render(
      <ThemeProvider theme={theme}>
        <SearchInput />
      </ThemeProvider>
    );
    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it("opens the drawer when the button is clicked", async () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchInput />
      </ThemeProvider>
    );

    const searchButton = screen.getByRole("button", { name: /search/i });

    await act(async () => {
      fireEvent.click(searchButton);
    });
    // Check if the drawer is open
    const drawer = screen.getByRole("presentation");
    expect(drawer).toBeInTheDocument();
  });

  it("renders search icon for mobile screens", () => {
    (useMediaQuery as jest.Mock).mockImplementationOnce(() => true);

    render(
      <ThemeProvider theme={theme}>
        <SearchInput />
      </ThemeProvider>
    );
    const searchIcon = screen.getByTestId("screen-view-button");

    expect(searchIcon).toBeInTheDocument();
  });
});
