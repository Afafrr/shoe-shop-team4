"use client";
import {
  Box,
  Grid,
  Link,
  Typography,
  useTheme,
  Divider,
  Container,
} from "@mui/material";
import { FormContainer, useForm } from "react-hook-form-mui";
import Input from "@/components/Input/Input";
import { personalInfo, shippingInfo } from "../_schema/checkoutSchema";
import { checkoutValidation } from "../_schema/checkoutValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutStripeForm, { confirmPaymentForm } from "./CheckoutStripeForm";
import { calculateOrderAmount } from "../_lib/calculateOrderAmount";
import { useState } from "react";
import SummaryInfo from "../../_components/SummaryInfo";
import { useCart } from "@/contexts/Cart";
import { CheckoutForm } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Stripe from "stripe";
import { ResData } from "@/utils/getData";
import { convertCustomerToForm } from "../_lib/convertCustomerToForm";

export default function ClientPage() {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("PUBLIC KEY not defined");
  }
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const lastElShippingInfo = shippingInfo[shippingInfo.length - 1];
  const { totalPrice, cartItems } = useCart();
  const { total } = totalPrice();
  const products = JSON.stringify(cartItems.map((item) => item.productId)); //String Array of products ids
  const { data } = useQuery<ResData<Stripe.Customer>>({
    queryKey: ["customer-info"],
  });

  const defaultValues = data?.data ? convertCustomerToForm(data.data) : {};
  const formContext = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutValidation),
    defaultValues,
  });
  const { handleSubmit } = formContext;

  type FormWithoutProducts = Omit<CheckoutForm, "products">;
  async function onSubmit(data: FormWithoutProducts) {
    await confirmPaymentForm({ ...data, products: products });
  }
  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          width: "100%",
          maxWidth: { xs: "388px", sm: "500px", md: "1400px" },
          mb: { xs: "50px", md: "100px" },
          px: { xs: "15px ", md: "20px" },
          paddingLeft: { xs: "auto", md: "60px" },
        }}
      >
        <Box
          sx={{
            flexGrow: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mx: { xs: "auto", md: 0 },
            maxWidth: { xs: "388px", sm: "500px", md: "800px" },
          }}
        >
          <Link
            href="/cart"
            sx={{
              m: { xs: "20px 0px 16px 0px", md: "39px 0px 23px 0px" },
              fontSize: "15px",
              fontWeight: 300,
              color: theme.palette.text.secondary,
              textDecoration: "underline",
            }}
          >
            Back to cart
          </Link>

          <Typography
            fontSize={{ xs: "35px", md: "45px" }}
            fontWeight={500}
            sx={{ mb: { xs: "40px", md: "74px" } }}
          >
            Checkout
          </Typography>
          {/* Personal Info */}
          <SectionTitle title="Personal Info" />
          <Grid
            container
            rowSpacing={{ xs: 3, md: 4 }}
            columnSpacing={{ xs: 2, md: 3 }}
            sx={{ maxWidth: "776px" }}
          >
            {personalInfo.map((input) => (
              <Grid item key={input.label} xs={12} sm={6}>
                <Input
                  key={input.label}
                  label={input.label}
                  props={input.props}
                />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: { sm: "40px", xs: "50px", md: "74px" } }} />
          {/* Shipping info */}
          <SectionTitle title="Shipping info" />
          <Grid
            container
            rowSpacing={{ xs: 3, md: 4 }}
            columnSpacing={{ xs: 2, md: 3 }}
            sx={{ maxWidth: "776px" }}
          >
            {shippingInfo.slice(0, -1).map((input) => (
              <Grid item key={input.label} xs={6} sm={3}>
                <Input
                  key={input.label}
                  label={input.label}
                  props={input.props}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Input
                key={lastElShippingInfo.label}
                label={lastElShippingInfo.label}
                props={lastElShippingInfo.props}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: { sm: "40px", xs: "50px", md: "74px" } }} />
          {/* Payment info */}
          <SectionTitle title="Payment info" />
          <Box
            sx={{
              minHeight: { xs: "235px", md: "155px" },
              mb: { xs: "0px", md: "100px" },
              position: "relative",
            }}
          >
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: calculateOrderAmount(Number(total)),
                currency: "usd",
                loader: "always",
              }}
            >
              <CheckoutStripeForm
                amount={calculateOrderAmount(Number(total))}
                customerId={data?.data?.id || null}
                setIsLoading={setIsLoading}
              />
            </Elements>
          </Box>
        </Box>
        {/* Checkout Summary */}
        <CheckoutSummary isLoading={isLoading} />
      </Container>
    </FormContainer>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Typography
      fontSize={{ xs: "16px", md: "20px" }}
      fontWeight={500}
      sx={{
        mb: { xs: "25px", md: "32px" },
      }}
    >
      {title}
    </Typography>
  );
}
function CheckoutSummary({ isLoading }: { isLoading: boolean }) {
  return (
    <Box
      sx={{
        alignSelf: "flex-start",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: { xs: "relative", md: "sticky" },
        top: { xs: "auto", md: "40px" },
        maxWidth: { xs: "auto", md: "400px" },
        width: { xs: "100%", md: "auto" },
        minWidth: "300px",
        ml: { xs: "auto", md: "20px" },
        mt: { xs: "50px", md: "0px" },
      }}
    >
      <SummaryInfo
        btnText={isLoading ? "Loading..." : `Confirm & Pay`}
        btnAction={() => {}}
        btnDisabled={isLoading}
      />
    </Box>
  );
}
