import { Grid } from "@mui/material";
import { ReactNode } from "react";
import ProfileTitle from "./ProfileTitle";

type ProductCollectionProps = {
  title: string;
  children: ReactNode;
};

export default function ProductCollection({
  title,
  children,
}: ProductCollectionProps) {
  return (
    <ProfileTitle title={title}>
      <Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}>
        {children}
      </Grid>
    </ProfileTitle>
  );
}
