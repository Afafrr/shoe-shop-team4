import { Stack } from "@mui/material";
import { ReactNode } from "react";

type ProductsLayoutProps = {
  children: ReactNode;
};

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <Stack
      spacing={{ xs: 1, m: 2 }}
      direction="row"
      useFlexGap
      justifyContent="space-between"
      sx={{ flexWrap: "wrap" }}
    >
      {children}
    </Stack>
  );
}
