import Stripe from "stripe";
import { CheckoutForm } from "@/types/types";

export function convertCustomerToForm(
  customerData: Stripe.Customer
): Partial<CheckoutForm> {
  const { address, email, name, phone } = customerData;
  const fullName = name ? name.split(" ") : "";
  const firstName = fullName[0];
  const surname = fullName[1];
  const personalInfo = {
    firstName: firstName || "",
    surname: surname || "",
    email: email || "",
    phoneNumber: phone || "",
  };
  if (!address) return personalInfo;
  const { city, country, line1, postal_code, state } = address;

  return {
    ...personalInfo,
    country: country || "",
    city: city || "",
    state: state || "",
    zipCode: postal_code || "",
    address: line1 || "",
  };
}
