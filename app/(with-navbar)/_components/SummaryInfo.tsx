import { ExpandMore } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useCart } from "@/contexts/Cart";

export default function SummaryInfo({
  btnAction,
  btnText,
}: {
  btnAction: () => void;
  btnText: string;
}) {
  const { getCartItemCount, totalPrice } = useCart();
  const { subtotal, shipping, tax, total } = totalPrice();

  if (getCartItemCount() === 0) return;

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        width: "100%",
        [theme.breakpoints.up("md")]: {
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
            md: "80px auto 50px 20px",
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
          m: "13.73px 15px 12px 15px",
        }}
        gap={3}
      >
        <Stack direction="row" gap={2}>
          <Typography fontWeight={400} fontSize={"16px"}>
            Do you have a promocode
          </Typography>
          <ExpandMore />
        </Stack>
        <SummaryLine concept="Subtotal" amount={subtotal} />
        <SummaryLine concept="Shipping" amount={shipping} />
        <SummaryLine concept="Tax" amount={tax} />
        <Divider />
        <SummaryLine concept="Total" amount={total} total />
        <Divider />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          mb: "20px",
          mx: "auto",
          borderRadius: "8px",
          minWidth: { xs: "240px", lg: "320px" },
        }}
        onClick={btnAction}
      >
        {btnText}
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
