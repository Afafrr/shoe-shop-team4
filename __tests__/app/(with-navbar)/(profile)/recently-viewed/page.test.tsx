import { UserDataProvider } from "@/contexts/UserDataProvider";
import { RecentlyProvider } from "@/contexts/RecentlyViewed";
import RecentlyViewed from "@/app/(with-navbar)/(profile)/recently-viewed/_components/RecentlyViewed";
import { render, screen } from "@testing-library/react";
import { mockUserData } from "../my-wishlist/page.test";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/my-products"),
}));

describe("Recently Viewed Page Component", () => {
  it("renders", () => {
    render(
      <UserDataProvider data={mockUserData}>
        <RecentlyProvider>
          <RecentlyViewed />
        </RecentlyProvider>
      </UserDataProvider>
    );
    // Test if the title is rendered
    expect(screen.getByText("Recently Viewed")).toBeInTheDocument();
  });
});
