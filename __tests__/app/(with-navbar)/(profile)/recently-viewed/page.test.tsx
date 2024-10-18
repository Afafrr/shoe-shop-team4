import { RecentlyProvider } from "@/contexts/RecentlyViewed";
import RecentlyViewed from "@/app/(with-navbar)/(profile)/recently-viewed/_components/RecentlyViewed";
import { render, screen } from "@testing-library/react";

describe("Recently Viewed Page Component", () => {
  it("renders", () => {
    render(
      <RecentlyProvider>
        <RecentlyViewed />
      </RecentlyProvider>
    );
    // Test if the title is rendered
    expect(screen.getByText("Recently Viewed")).toBeInTheDocument();
  });
});
