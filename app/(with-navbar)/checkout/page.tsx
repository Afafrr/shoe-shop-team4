"use client";
import { useUserData } from "@/contexts/UserDataProvider";
import {
  Box,
  Grid,
  Link,
  Typography,
  useTheme,
  Divider,
  Container,
  Button,
} from "@mui/material";
import { FieldValues, FormContainer, useForm } from "react-hook-form-mui";
import Input from "@/components/Input/Input";
import { personalInfo, shippingInfo } from "./_schema/checkoutSchema";
import { checkoutValidation } from "./_schema/checkoutValidation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const { data } = useUserData();
  const theme = useTheme();
  const lastElShippingInfo = shippingInfo[shippingInfo.length - 1];
  console.log(checkoutValidation.shape);

  const formContext = useForm<FieldValues>({
    resolver: zodResolver(checkoutValidation),
  });
  const { handleSubmit } = formContext;

  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit((data) => console.log("submitted", data))}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: { xs: "388px", sm: "500px", md: "1400px" },
          px: { xs: "15px", md: "40px" },
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
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <p>Checkout</p>
          <p>Checkout</p>
          <p>Checkout</p>
          <p>Checkout</p>
          <p>Checkout</p>
          <Button variant="contained" type="submit">
            Checkout
          </Button>
        </Box>
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
