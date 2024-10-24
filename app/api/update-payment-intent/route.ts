import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/utils/auth";
import Stripe from "stripe";
import { CheckoutForm } from "@/types/types";
import { postData } from "@/utils/postData";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

function customerObjFromForm(metadata: {
  [key in keyof CheckoutForm]: string;
}): Partial<Stripe.CustomerCreateParams> {
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

  return {
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
  };
}
//create Customer and update already existing paymentIntent with form data
export async function POST(req: NextRequest) {
  const {
    metadata,
    customerId: receivedId,
    paymentId,
  }: {
    metadata: { [key in keyof CheckoutForm]: string };
    customerId: string | null;
    paymentId: string;
  } = await req.json();
  let customerId = receivedId;
  const customerObj = customerObjFromForm(metadata);

  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Session not found");
    //if customer ID not found create new and update DB,
    //otherwise update old customer obj
    if (!customerId) {
      const newCustomer = await stripe.customers.create(customerObj);
      customerId = newCustomer.id;
      //update user in DB with new customerId
      await postData({
        url: `users/${session.user.id}`,
        method: "PUT",
        token: session.user.jwt,
        data: { customerId: customerId },
      });
    } else {
      await stripe.customers.update(customerId, customerObj);
    }
    //update paymentIntent with latest data
    const paymentIntent = await stripe.paymentIntents.update(paymentId, {
      metadata: { ...metadata },
      customer: customerId,
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
