import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import Stripe from "stripe";
import { getData } from "@/utils/getData";
import { UserData } from "@/types/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function getCustomerData() {
  const session = await getServerSession(authOptions);
  try {
    const { data, error } = await getData<UserData>(
      "users/me",
      session?.user.jwt
    );
    if (!data || error) {
      throw new Error("Cannot get user data");
    }
    const { customerId } = data;
    if (!customerId) {
      return JSON.stringify({ data: null, error: "" });
    }
    const customer = await stripe.customers.retrieve(customerId);

    return JSON.stringify({ data: customer, error: "" });
  } catch (error) {
    console.error(error);
    return JSON.stringify({ data: null, error: (error as Error).message });
  }
}

