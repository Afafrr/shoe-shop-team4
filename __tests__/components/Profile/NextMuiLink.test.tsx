import NextMuiLink from "@/components/Profile/NextMuiLink";
import { render, screen } from "@testing-library/react";

describe("NextMuiLink Component", () => {
  it("renders the NextMuiLink with correct href and children", () => {
    const href = "/about";
    const children = "About Us";

    // Render the component
    render(<NextMuiLink href={href}>{children}</NextMuiLink>);

    // Check if the link is in the document and has correct href
    const linkElement = screen.getByRole("link", { name: "About Us" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", href);
  });
});
