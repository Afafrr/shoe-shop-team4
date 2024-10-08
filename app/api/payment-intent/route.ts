import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/utils/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { amount, userId } = await req.json();
    console.log(userId);
    
    // Create a PaymentIntent with the order amount currency and User ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      metadata: {
        userId: JSON.stringify(userId),
      },
    });
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  try {
    // search for paymentIntent by user ID
    const paymentIntent = await stripe.charges.search({
      query: `metadata[\'userId\']:\'${userId}\'`,
    });

    return NextResponse.json({ data: paymentIntent });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
