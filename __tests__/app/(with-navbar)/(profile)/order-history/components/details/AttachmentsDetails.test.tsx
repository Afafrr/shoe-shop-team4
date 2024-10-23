import AttachmentsDetails from "@/app/(with-navbar)/(profile)/order-history/_components/details/AttachmentsDetails";
import { render } from "@testing-library/react";

describe("AttachmentsDetails component", () => {
  it("renders the InfoBox with the correct discount value", () => {
    const { getByText } = render(<AttachmentsDetails />);

    expect(getByText("Discount:")).toBeInTheDocument();
    expect(getByText("0$")).toBeInTheDocument();
  });

  it("contains a placeholder for the invoice", () => {
    const { container } = render(<AttachmentsDetails />);

    const invoicePlaceholder = container.querySelector("div > div");
    expect(invoicePlaceholder).toBeInTheDocument();
  });
});
