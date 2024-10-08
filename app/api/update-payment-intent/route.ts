import { metadata } from "@/app/layout";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/utils/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const {
      metadata,
      paymentId,
    }: {
      metadata: { [key: string]: string };
      paymentId: string;
    } = await req.json();
    //update paymentIntent with latest data
    console.log(metadata);

    const paymentIntent = await stripe.paymentIntents.update(paymentId, {
      metadata: { ...metadata },
    });
    // const invoice = await stripe.invoices.create();
    // console.log({ invoice });

    return NextResponse.json({ metadata: paymentIntent.metadata });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
