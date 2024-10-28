import { render, screen } from "@testing-library/react";
import { useCart } from "@/contexts/Cart";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/utils/getData";
import { useSession } from "next-auth/react";
import NavBar from "@/app/(with-navbar)/_components/navbar";

jest.mock("@/contexts/Cart", () => ({
  useCart: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/utils/getData", () => ({
  getData: jest.fn(),
}));

jest.mock("@/app/(with-navbar)/_components/searchInput.tsx", () => () => (
  <div data-testid="search-input">SearchInput</div>
));
jest.mock("@/app/(with-navbar)/_components/sidebar.tsx", () => () => (
  <div data-testid="sidebar">SideBar</div>
));
jest.mock("@/app/(with-navbar)/_components/CartIcon.tsx", () => () => (
  <div data-testid="cart-icon">CartIcon</div>
));

describe("NavBar", () => {
  const mockUseCart = useCart as jest.Mock;
  const mockUseQuery = useQuery as jest.Mock;
  const mockUseSession = useSession as jest.Mock;

  beforeEach(() => {
    mockUseCart.mockReturnValue({ getCartItemCount: jest.fn(() => 3) });
    mockUseQuery.mockReturnValue({
      data: null,
      refetch: jest.fn(),
    });
    mockUseSession.mockReturnValue({
      data: { user: { jwt: "mock-jwt" } },
      status: "authenticated",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders NavBar with user logged in", () => {
    mockUseQuery.mockReturnValue({
      data: { data: { firstName: "John", avatar: { url: "/avatar.jpg" } } },
      refetch: jest.fn(),
    });
    render(<NavBar />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    const cartIcons = screen.getAllByTestId("cart-icon");
    expect(cartIcons).toHaveLength(2);
    expect(screen.getByAltText("User logged In")).toHaveAttribute(
      "src",
      "/avatar.jpg"
    );
  });

  it("renders Sign In button when user is not logged in", () => {
    mockUseSession.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<NavBar />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("shows the correct cart item count", () => {
    render(<NavBar />);

    const cartIcons = screen.getAllByTestId("cart-icon");
    expect(cartIcons).toHaveLength(2); // Expecting two cart icons (one for desktop, one for mobile)
    expect(mockUseCart().getCartItemCount).toHaveBeenCalled();
  });

  it("calls refetch when user data is missing and session is authenticated", () => {
    // Mock session as authenticated but no user data
    const mockRefetch = jest.fn();
    mockUseSession.mockReturnValueOnce({
      data: { user: { jwt: "mock-jwt" } },
      status: "authenticated",
    });
    mockUseQuery.mockReturnValueOnce({
      data: null,
      refetch: mockRefetch,
    });

    render(<NavBar />);

    expect(mockRefetch).toHaveBeenCalled();
  });

  it("fetches user data with the correct API call", () => {
    const jwtToken = "mock-jwt";

    mockUseSession.mockReturnValueOnce({
      data: { user: { jwt: jwtToken } },
      status: "authenticated",
    });

    mockUseQuery.mockImplementation(({ queryFn }) => {
      queryFn();
      return { data: null, refetch: jest.fn() };
    });

    render(<NavBar />);

    expect(getData).toHaveBeenCalledWith("users/me?populate=avatar", jwtToken);
  });
});
