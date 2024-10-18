"use client";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { postData, getUserTransactions } from "../actions";
import { CheckoutForm } from "@/types/types";
export let confirmPaymentForm: any;
// PI as Payment Intent
type createPI = {
  clientSecret: string;
  paymentId: string;
};
type dataPI = {
  clientSecret: string;
  paymentId: string;
};

export default function CheckoutStripeForm({
  amount,
  setIsLoading,
}: {
  amount: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [paymentData, setPaymentData] = useState<dataPI | null>();
  const [message, setMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const clientSecret = paymentData?.clientSecret;
  const paymentId = paymentData?.paymentId;
  const userId = session?.data?.user.id;

  useEffect(() => {
    getUserTransactions();

    if (!userId) {
      setMessage("User not found");
      setIsLoading(false);
      return;
    }
    async function createPaymentIntent() {
      setMessage("");
      const res = await postData<createPI>("/api/payment-intent", {
        userId: userId,
        amount: amount,
      });
      if (res.error) {
        setMessage(res.error);
        setIsLoading(false);
        return false;
      }
      setPaymentData(res.data);
      setIsLoading(false);
    }
    createPaymentIntent();
  }, [amount, userId]);

  confirmPaymentForm = async (metadata: CheckoutForm) => {
    setIsLoading(true);
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return false;
    }
    if (!clientSecret) {
      setMessage("There is no client secret");
      return;
    }
    //submit payment form
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message as string);
      setIsLoading(false);
      return;
    }
    //update payment intent with metadata
    const res = await postData<CheckoutForm>("/api/update-payment-intent", {
      metadata: metadata,
      userId: userId,
      paymentId: paymentId,
    });
    if (res.error) {
      setMessage(res.error);
      setIsLoading(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/checkout/success`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };
  if (!stripe || !elements) {
    return (
      <Container
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  return (
    <>
      {message ? (
        <Typography className="message" id="message" color="red" mb="10px">
          {message}
        </Typography>
      ) : null}
      {clientSecret && <PaymentElement />}
    </>
  );
}
