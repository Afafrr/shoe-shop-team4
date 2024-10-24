import CheckoutStripeForm, {
  confirmPaymentForm,
} from "@/app/(with-navbar)/checkout/_components/CheckoutStripeForm";
import { act, render, screen } from "@testing-library/react";
import { postData } from "@/app/(with-navbar)/checkout/actions";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";

jest.mock("@stripe/react-stripe-js", () => ({
  useElements: jest.fn(),
  useStripe: jest.fn(),
  PaymentElement: jest.fn(() => <div>Pay with paymentElement</div>),
}));
jest.mock("@/app/(with-navbar)/checkout/actions", () => ({
  postData: jest.fn(),
  getUserTransactions: jest.fn(),
}));

describe("CheckoutStripeForm without stripe and elements", () => {
  it("render loading", () => {
    render(
      <CheckoutStripeForm
        amount={100}
        setIsLoading={jest.fn()}
        customerId={null}
      />
    );
    const loadingElement = screen.getByRole("progressbar");
    expect(loadingElement).toBeInTheDocument();
  });
});

describe("CheckoutStripeForm successes", () => {
  const mockSubmit = jest.fn(() => ({ error: false }));
  const mockConfirmPayment = jest.fn(() => ({ error: false }));

  beforeEach(() => {
    (postData as jest.Mock).mockReturnValue({
      data: { clientSecret: "example", paymentId: "example" },
      error: "",
    });
    (useStripe as jest.Mock).mockReturnValue({
      confirmPayment: mockConfirmPayment,
    });
    (useElements as jest.Mock).mockReturnValue({
      submit: mockSubmit,
    });
    (useSession as jest.Mock).mockReturnValue({ data: { user: { id: "2" } } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("render loading without stripe and elements", async () => {
    await act(async () => {
      render(
        <CheckoutStripeForm
          amount={100}
          setIsLoading={jest.fn()}
          customerId={null}
        />
      );
    });

    expect(screen.getByText("Pay with paymentElement")).toBeInTheDocument();
  });

  it("confirms payment form", async () => {
    await confirmPaymentForm();

    expect(mockConfirmPayment).toHaveBeenCalledTimes(1);
  });

  //ERRORS
  async function renderAndRunConfirmPaymentForm() {
    await act(async () => {
      render(
        <CheckoutStripeForm
          amount={100}
          setIsLoading={jest.fn()}
          customerId={null}
        />
      );
    });
    await act(async () => {
      await confirmPaymentForm();
    });
  }

  it("shows error if stripe doest not exists", async () => {
    (useElements as jest.Mock).mockReturnValue(null);
    await act(async () => {
      render(
        <CheckoutStripeForm
          amount={100}
          setIsLoading={jest.fn()}
          customerId={null}
        />
      );
    });
    let res;
    await act(async () => {
      res = await confirmPaymentForm();
    });

    expect(res).toEqual(false);
  });

  it("shows error if user not found", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(
      <CheckoutStripeForm
        amount={100}
        setIsLoading={jest.fn()}
        customerId={null}
      />
    );

    expect(screen.getByText("User not found")).toBeInTheDocument();
  });

  it("shows error if error in postData response", async () => {
    (postData as jest.Mock).mockReturnValue({
      data: null,
      error: "There was postData error",
    });
    await act(async () => {
      render(
        <CheckoutStripeForm
          amount={100}
          setIsLoading={jest.fn()}
          customerId={null}
        />
      );
    });

    expect(screen.getByText("There was postData error")).toBeInTheDocument();
  });

  it("shows error if there is no client secret", async () => {
    (postData as jest.Mock).mockReturnValue({
      data: { clientSecret: undefined, paymentId: "example" },
      error: "",
    });
    await renderAndRunConfirmPaymentForm();

    expect(screen.getByText("There is no client secret")).toBeInTheDocument();
  });

  it("shows error if there is no client secret", async () => {
    (useElements as jest.Mock).mockReturnValue({
      submit: jest.fn(() => ({ error: { message: "useElements error" } })),
    });
    await renderAndRunConfirmPaymentForm();

    expect(screen.getByText("useElements error")).toBeInTheDocument();
  });

  it("shows error if there is no client secret", async () => {
    await act(async () => {
      render(
        <CheckoutStripeForm
          amount={100}
          setIsLoading={jest.fn()}
          customerId={null}
        />
      );
    });
    (postData as jest.Mock).mockReturnValue({
      data: { clientSecret: "123", paymentId: "234" },
      error: "There was postData error",
    });
    await act(async () => {
      await confirmPaymentForm();
    });

    expect(screen.getByText("There was postData error")).toBeInTheDocument();
  });

  it("shows payment confirmation error", async () => {
    (useStripe as jest.Mock).mockReturnValue({
      confirmPayment: () => ({
        error: { type: "card_error", message: "Card error" },
      }),
    });
    await renderAndRunConfirmPaymentForm();

    expect(screen.getByText("Card error")).toBeInTheDocument();
  });
});
