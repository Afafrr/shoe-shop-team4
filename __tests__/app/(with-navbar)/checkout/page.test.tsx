import { render, screen } from "@testing-library/react";
import Page from "@/app/(with-navbar)/checkout/page";
import { useCart } from "@/contexts/Cart";

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
    render(<Page />);
    expect(screen.getByText("Elements")).toBeInTheDocument();
  });
});

describe("Checkout Page", () => {
  it("throws error if there is no stripe public key", () => {
    delete process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    expect(() => render(<Page />)).toThrow("PUBLIC KEY not defined");
  });
});
