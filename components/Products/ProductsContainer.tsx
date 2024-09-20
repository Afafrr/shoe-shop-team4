import Grid from "@mui/material/Unstable_Grid2";
import { ReactNode } from "react";

type ProductsLayoutProps = {
  children: ReactNode;
};

export default function ProductContainer({ children }: ProductsLayoutProps) {
  return (
    <Grid xs={6} sm={4} md={4} lg={3}>
      {children}
    </Grid>
  );
}
