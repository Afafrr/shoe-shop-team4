"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import Stripe from "stripe";
import { getData } from "@/utils/getData";
import { UserData } from "@/types/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function getUserOrders() {
  try {
    const session = await getServerSession(authOptions);
    const { data, error } = await getData<UserData>(
      "users/me",
      session?.user.jwt
    );
    if (!data || error) {
      throw new Error("Cannot get user data");
    }

    const { customerId } = data;

    if (!customerId)
      return {
        data: null,
        error: "customerId not found",
      };

    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      expand: ["data.payment_method"],
    });
    return { data: paymentIntents, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch order details" };
  }
}