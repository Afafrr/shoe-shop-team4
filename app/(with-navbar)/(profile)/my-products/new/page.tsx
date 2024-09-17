"use client";
import { Container } from "@mui/material";
import { productSchema } from "@/schemas/productSchema";
import { addProductAction } from "./action";
import ProductManager from "../_components/ProductManager/ProductManager";
import { ContextType } from "@/types/types";
import { useCallback } from "react";

export default function AddProduct() {
  const title = {
    header: "Add a Product",
    subheader:
      "Lorem ipsum, or ipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  };
  const formActions = {
    schema: productSchema,
    submitAction: useCallback(
      (formData: FormData, context: ContextType) =>
        addProductAction(formData, context),
      []
    ),
  };

  return (
    <Container sx={{ margin: "0" }}>
      <ProductManager
        header={title.header}
        subheader={title.subheader}
        formActions={formActions}
      />
    </Container>
  );
}
