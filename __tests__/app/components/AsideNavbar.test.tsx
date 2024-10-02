import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { AsideNavbar } from "@/components/Profile/AsideNavbar";
import { signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(), // Mock signOut function
}));

describe("AsideNavbar", () => {
  let myProductsBtn: HTMLElement;
  let settingsBtn: HTMLElement;
  let logoutBtn: HTMLElement;

  beforeEach(() => {
    render(<AsideNavbar parentsSX={{}} activeBtnPath="my-products" />);
    myProductsBtn = screen.getByText("My Products");
    settingsBtn = screen.getByText("Settings");
    logoutBtn = screen.getByText("Logout");
  });

  it("renders buttons", () => {
    expect(myProductsBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it("checks buttons actions", () => {
    expect(myProductsBtn.closest("a")).toHaveAttribute("href", "my-products");
    expect(settingsBtn.closest("a")).toHaveAttribute("href", "settings");
  });

  it("checks logout button call", () => {
    fireEvent.click(logoutBtn);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
