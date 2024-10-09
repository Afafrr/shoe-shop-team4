import { UserDataProvider } from "@/contexts/UserDataProvider";
import { render, screen } from "@testing-library/react";
import { mockUserData } from "../my-wishlist/page.test";
import ProfileAside from "@/app/(with-navbar)/(profile)/_components/ProfileAside";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/my-products"),
}));

const Buttons = [
  "My Products",
  "Order history",
  "My Wishlist",
  "Recently viewed",
  "Settings",
  "Logout",
];

describe("ProfileAside Component", () => {
  it("renders", () => {
    // Render the component
    render(
      <UserDataProvider data={mockUserData}>
        <ProfileAside />
      </UserDataProvider>
    );

    // Test if the User description is rendered
    expect(screen.getByText("team")).toBeInTheDocument();
    // Check AsideNavbar is correctly rendered by fetching it's buttons
    Buttons.forEach((buttonText) => {
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });
  });
});
