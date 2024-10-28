import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { AsideNavbar } from "@/components/Profile/AsideNavbar";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material";
import { signOut } from "next-auth/react";

// Mock `useTheme` to control theme colors
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn(),
}));

describe("AsideNavbar", () => {
  let myProductsBtn: HTMLElement;
  let orderHistoryBtn: HTMLElement;
  let settingsBtn: HTMLElement;
  let logoutBtn: HTMLElement;

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      palette: {
        primary: {
          main: "#ff0000",
        },
      },
    });

    (usePathname as jest.Mock).mockReturnValue("/my-products");

    render(<AsideNavbar parentsSX={{}} />);
    myProductsBtn = screen.getByText("My Products");
    settingsBtn = screen.getByText("Settings");
    orderHistoryBtn = screen.getByText("Order history");
    logoutBtn = screen.getByText("Logout");
  });

  it("renders buttons", () => {
    expect(myProductsBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();
    expect(orderHistoryBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it("checks buttons actions", () => {
    expect(myProductsBtn.closest("a")).toHaveAttribute("href", "/my-products");
    expect(settingsBtn.closest("a")).toHaveAttribute("href", "/settings");
  });

  it("checks logout button call", () => {
    fireEvent.click(logoutBtn);
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it("applies the activeBtnColor when the href matches the pathname", () => {
    const myProductsButton = screen.getByText("My Products");

    expect(myProductsButton).toHaveStyle("color: #ff0000");
  });
});
