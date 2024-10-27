import { render } from "@testing-library/react";
import ContactDetails from "@/app/(with-navbar)/(profile)/order-history/_components/details/ContactDetails";

const mockContactDetails = {
  address: "123 Main St",
  city: "Any town",
  firstName: "John",
  surname: "Doe",
  phoneNumber: "555-1234",
  email: "john.doe@example.com",
};

describe("ContactDetails component", () => {
  it("renders the delivery, contact, and payment information correctly", () => {
    const { getByText } = render(
      <ContactDetails
        contactDetails={mockContactDetails}
        paymentType="Credit Card"
      />
    );

    // Check that the InfoBox components render with correct values
    expect(getByText("Delivery:")).toBeInTheDocument();
    expect(getByText("123 Main St, Any town")).toBeInTheDocument();

    expect(getByText("Contacts:")).toBeInTheDocument();
    expect(
      getByText("John Doe, 555-1234, john.doe@example.com")
    ).toBeInTheDocument();

    expect(getByText("Payment:")).toBeInTheDocument();
    expect(getByText("Credit Card")).toBeInTheDocument();
  });
});
