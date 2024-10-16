import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import SideBar from "@/app/(with-navbar)/_components/sidebar";

jest.mock("@/components/Profile/AsideNavbar", () => ({
  AsideNavbar: () => <div data-testid="aside-navbar">AsideNavbar Content</div>,
}));

describe("SideBar Component", () => {
  const renderComponent = (isLoggedIn = false) => {
    return render(
      <ThemeProvider theme={theme}>
        <SideBar isLoggedIn={isLoggedIn} />
      </ThemeProvider>
    );
  };

  it("renders the menu icon button", () => {
    renderComponent();

    const menuButton = screen.getByTestId("MenuIcon");
    expect(menuButton).toBeInTheDocument();
  });

  it("opens the drawer when the menu icon button is clicked", () => {
    renderComponent();

    const menuButton = screen.getByTestId("MenuIcon");

    // Open the drawer
    fireEvent.click(menuButton);
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  it("renders AsideNavbar for logged-in users", () => {
    renderComponent(true); // Logged-in user

    // Open the drawer
    const menuButton = screen.getByTestId("MenuIcon");
    fireEvent.click(menuButton);

    // Expect the AsideNavbar to be rendered
    const asideNavbar = screen.getByTestId("aside-navbar");
    expect(asideNavbar).toBeInTheDocument();
  });

  it("renders CustomListButtonItem for non-logged-in users", () => {
    renderComponent(false); // Non-logged-in user

    // Open the drawer
    const menuButton = screen.getByTestId("MenuIcon");
    fireEvent.click(menuButton);

    // Expect the CustomListButtonItem to render the "Sign In" button
    const signInButton = screen.getByRole("link", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/auth/sign-in");
  });
});
