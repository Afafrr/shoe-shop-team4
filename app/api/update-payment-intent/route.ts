import { metadata } from "@/app/layout";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/utils/auth";
import Stripe from "stripe";
import { CheckoutForm } from "@/types/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

//create Customer and update already existing paymentIntent with form data
export async function POST(req: NextRequest) {
  try {
    const {
      metadata,
      userId,
      paymentId,
    }: {
      metadata: { [key in keyof CheckoutForm]: string };
      userId: string | undefined;
      paymentId: string;
    } = await req.json();

    if (!userId) throw new Error("User not found");
    const {
      address,
      country,
      city,
      state,
      zipCode,
      email,
      firstName,
      surname,
      phoneNumber,
    } = metadata;
    //look for existing customer
    const { data: existingCustomers } = await stripe.customers.search({
      query: `metadata['userId']: '${userId}'`,
    });
    const existingCustomer = existingCustomers[0];
    const customerObj = {
      name: firstName + " " + surname,
      email: email,
      address: {
        city,
        country,
        line1: address,
        postal_code: zipCode,
        state,
      },
      phone: phoneNumber,
      metadata: { userId },
    };

    //create new customer if not found, else update old one
    let newCustomer: Stripe.Customer | null = null;
    if (!existingCustomer) {
      newCustomer = await stripe.customers.create(customerObj);
    } else {
      await stripe.customers.update(existingCustomer.id, customerObj);
    }
    //update paymentIntent with latest data
    const paymentIntent = await stripe.paymentIntents.update(paymentId, {
      metadata: { ...metadata },
      customer: newCustomer?.id || existingCustomer.id,
    });

    return NextResponse.json({ metadata: paymentIntent.metadata });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
