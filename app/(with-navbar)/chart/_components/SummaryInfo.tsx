import { ExpandMore } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import useIsMobile from "../../(profile)/my-products/_components/useIsMobile";

export default function SummaryInfo({ subtotal }: { subtotal: number }) {
  const isMobile = useIsMobile();

  const { shipping, tax, total } = calculateTotal(subtotal);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        [theme.breakpoints.up("md")]: {
          mr: "50px",
          height: "100%",
          flex: 1,
          flexGrow: 1,
        },
      })}
    >
      <Box
        sx={{
          m: {
            xs: "13.73px 16.22px 12px 20px",
            md: "80px auto 50px 50px",
          },
        }}
      >
        <Typography fontWeight={500} fontSize={"30px"}>
          Summary
        </Typography>
      </Box>
      <Divider sx={{ display: { xs: "block", md: "none" } }} />
      <Stack
        flexGrow={1}
        sx={{
          m: "13.73px 16.22px 12px 20px",
        }}
        gap={3}
      >
        <Stack direction="row" gap={2}>
          <Typography fontWeight={400} fontSize={"16px"}>
            Do you have a promocode
          </Typography>
          <ExpandMore />
        </Stack>
        <SummaryLine concept="Subtotal" amount={subtotal.toFixed(2)} />
        <SummaryLine concept="Shipping" amount={shipping} />
        <SummaryLine concept="Tax" amount={tax} />
        <Divider />
        <SummaryLine concept="Total" amount={total} total />
        <Divider />
      </Stack>
      <Button
        variant="contained"
        size="large"
        sx={{
          mb: "20px",
          mx: "auto",
          borderRadius: "8px",
          minWidth: { xs: "240px", sm: "320px" },
        }}
      >
        {isMobile ? "Go to checkout" : "Checkout"}
      </Button>
    </Box>
  );
}

type SummaryLineProps = {
  concept: string;
  amount: string;
  total?: boolean;
};

function SummaryLine({ concept, amount, total }: SummaryLineProps) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography fontWeight={total ? 600 : 400} fontSize={"20px"}>
        {concept}
      </Typography>
      <Typography fontWeight={total ? 600 : 400} fontSize={"20px"}>
        ${amount}
      </Typography>
    </Stack>
  );
}

function calculateTotal(subtotal: number) {
  const freeShippingAmount = 200;
  const shippingCost = 20;
  const taxRate = 0.08;

  const shipping = subtotal > freeShippingAmount ? 0 : shippingCost;
  const tax = (subtotal + shipping) * taxRate;
  const total = subtotal + shipping + tax;

  return {
    shipping: shipping.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
  };
}
