import { render, screen } from "@testing-library/react";
import ClientPage from "@/app/(with-navbar)/checkout/_components/ClientPage";
import { useCart } from "@/contexts/Cart";
import { useQuery } from "@tanstack/react-query";

const originalEnv = process.env;
jest.mock(
  "@/app/(with-navbar)/checkout/_components/CheckoutStripeForm",
  () => ({
    __esModule: true,
    default: jest.fn(() => <div>Checkout</div>),
    confirmPaymentForm: jest.fn(),
  })
);
jest.mock("@stripe/react-stripe-js", () => ({
  Elements: jest.fn(() => <div>Elements</div>),
}));
jest.mock("@/app/(with-navbar)/checkout/actions", () => ({
  postData: jest.fn(),
}));
jest.mock("@/contexts/Cart");
(useCart as jest.Mock).mockReturnValue({
  totalPrice: () => ({ total: "100" }),
  cartItems: [{ id: "item2", name: "Item 2", price: 50 }],
  getCartItemCount: jest.fn(),
});
jest.mock("@tanstack/react-query");
(useQuery as jest.Mock).mockReturnValue({
  data: { data: null },
});

describe("Page", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "TestKey";
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = originalEnv;
  });

  it("stripePromise is defined", () => {
    expect(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).toBeDefined();
  });

  it("renders", () => {
    render(<ClientPage />);
    expect(screen.getByText("Elements")).toBeInTheDocument();
  });
});

describe("Checkout Page", () => {
  it("throws error if there is no stripe public key", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    delete process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const throwEr = () => {
      render(<ClientPage />);
    };
    expect(throwEr).toThrow("PUBLIC KEY not defined");
    consoleErrorSpy.mockRestore();
  });
});
