import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/utils/auth";
import Stripe from "stripe";
import { getData } from "@/utils/getData";
import { UserData } from "@/types/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

//gets stripe Customer data from DBs customerId
export async function GET() {
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
    if (!customerId) {
      return NextResponse.json(null);
    }
    
    const customer = await stripe.customers.retrieve(customerId);
    return NextResponse.json(customer);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 500,
      statusText: error.message,
    });
  }
}
