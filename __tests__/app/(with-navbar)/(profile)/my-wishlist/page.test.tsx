import { WishlistProvider } from "@/contexts/Wishlist";
import { UserDataProvider } from "@/contexts/UserDataProvider";
import { render, screen } from "@testing-library/react";
import MyWishlist from "@/app/(with-navbar)/(profile)/my-wishlist/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockImage = {
  id: 0,
  name: "",
  alternativeText: null,
  caption: null,
  width: 0,
  height: 0,
  formats: {
    thumbnail: {
      ext: "",
      url: "",
      hash: "",
      mime: "",
      name: "",
      path: null,
      size: 0,
      width: 0,
      height: 0,
      provider_metadata: {
        public_id: "",
        resource_type: "",
      },
    },
  },
  hash: "",
  ext: "",
  mime: "",
  size: 1,
  url: "",
  previewUrl: null,
  provider: "",
  provider_metadata: {
    public_id: "",
    resource_type: "",
  },
  createdAt: "",
  updatedAt: "",
};

const mockUserData = {
  data: {
    id: 123,
    username: "team-4",
    email: "team_four@gmail.com",
    provider: "",
    confirmed: true,
    blocked: false,
    createdAt: "",
    updatedAt: "",
    phoneNumber: "1234-5678",
    firstName: "team",
    lastName: "four",
    avatar: mockImage,
  },
  error: "",
};

describe("Wishlist Component", () => {
  it("renders", () => {
    render(
      <UserDataProvider data={mockUserData}>
        <WishlistProvider>
          <MyWishlist />
        </WishlistProvider>
      </UserDataProvider>
    );
    // Check page's main container is rendered
    expect(screen.getByTestId("my-wishlist-page")).toBeInTheDocument();
    // Check Wishlist Title is rendered
    expect(screen.getByText("My Wishlist")).toBeInTheDocument();
  });
});
