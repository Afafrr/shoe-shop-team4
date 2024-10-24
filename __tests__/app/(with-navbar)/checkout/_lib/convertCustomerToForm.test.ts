import { convertCustomerToForm } from "@/app/(with-navbar)/checkout/_lib/convertCustomerToForm";
import Stripe from "stripe";

describe("convertCustomerToForm", () => {
  it("should convert customer data with full information", () => {
    const customerData = {
      address: {
        city: "New York",
        country: "US",
        line1: "123 Main St",
        line2: null,
        postal_code: "10001",
        state: "NY",
      },
      email: "test@example.com",
      name: "John Doe",
      phone: "1234567890",
    } as Stripe.Customer;

    const expectedForm = {
      firstName: "John",
      surname: "Doe",
      email: "test@example.com",
      phoneNumber: "1234567890",
      country: "US",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      address: "123 Main St",
    };

    expect(convertCustomerToForm(customerData)).toEqual(expectedForm);
  });

  it("should convert customer data without address and with nulls", () => {
    const customerData = {
      address: null,
      email: "",
      name: "",
      phone: null,
    } as Stripe.Customer;

    const expectedForm = {
      firstName: "",
      surname: "",
      email: "",
      phoneNumber: "",
    };

    expect(convertCustomerToForm(customerData)).toEqual(expectedForm);
  });

  it("should convert customer data without address and with nulls", () => {
    const customerData = {
      address: {
        city: null,
        country: null,
        line1: null,
        line2: null,
        postal_code: null,
        state: null,
      },
      email: "",
      name: "",
      phone: null,
    } as Stripe.Customer;

    const expectedForm = {
      firstName: "",
      surname: "",
      email: "",
      phoneNumber: "",
      country: "",
      city: "",
      state: "",
      zipCode: "",
      address: "",
    };

    expect(convertCustomerToForm(customerData)).toEqual(expectedForm);
  });
});
