import { render, screen } from "@testing-library/react";
import ProfileAside from "@/app/(with-navbar)/(profile)/_components/ProfileAside";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { mockUser } from "../../../mockedFetch";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/my-products"),
}));
// Mock only useQuery, leave QueryClient untouched
jest.mock("@tanstack/react-query", () => {
  const actualReactQuery = jest.requireActual("@tanstack/react-query");
  return {
    ...actualReactQuery,
    useQuery: jest.fn(),
  };
});

// Create client context
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
const queryClient = getQueryClient();

const Buttons = [
  "My Products",
  "Order history",
  "My Wishlist",
  "Recently viewed",
  "Settings",
  "Logout",
];

describe("ProfileAside Component", () => {
  (useQuery as jest.Mock).mockReturnValue({
    data: { data: mockUser, error: "" },
  });
  it("renders", async () => {
    // Render the component
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileAside />;
      </QueryClientProvider>
    );
    // Test if the User description is rendered
    expect(screen.getByText("team")).toBeInTheDocument();
    // Check AsideNavbar is correctly rendered by fetching it's buttons
    Buttons.forEach((buttonText) => {
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });
  });
});
