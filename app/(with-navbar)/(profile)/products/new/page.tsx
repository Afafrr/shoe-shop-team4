"use client";
import { Container } from "@mui/material";
import { ReactNode } from "react";
import { addProductSchema } from "@/schemas/addProductSchema";
import { addProductAction } from "./action";
import ProductFormPage from "./_components/ProductFormPage";

type pageType = {
  children: ReactNode;
};

export default function AddProduct({ children }: pageType) {
  const props = {
    header: "Add a Product",
    subheader:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  };
  const formActions = {
    schema: addProductSchema,
    submitAction: addProductAction,
  };

  return (
    <Container sx={{ margin: "0" }}>
      <ProductFormPage props={props} formActions={formActions} />
    </Container>
  );
}
