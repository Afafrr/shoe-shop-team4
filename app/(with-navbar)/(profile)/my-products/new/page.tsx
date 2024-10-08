"use client";
import { Container } from "@mui/material";
import { productSchema } from "@/schemas/productSchema";
import { addProductAction } from "./action";
import ProductManager from "../_components/ProductManager/ProductManager";
import { ContextType } from "@/types/types";
import ProfileAside from "../../_components/ProfileAside";
import successToast from "@/components/Alerts/successToast";
import { useQueryClient } from "@tanstack/react-query";

export default function AddProduct() {
  const queryClient = useQueryClient();

  const title = {
    header: "Add a Product",
    subheader:
      "Create a new listing by entering key details like product name, price, and brand. Categorize your product by gender, and choose from a variety of colors and sizes. Upload images and write a compelling description to showcase your product. Keep in mind, this is what customers will see when selecting their shoes!",
  };
  const formActions = {
    schema: productSchema,
    submitAction: (formData: FormData, context: ContextType) =>
      addProductAction(formData, context),
    successFn: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      successToast("Product added successfully");
    },
  };

  return (
    <Container
      disableGutters
      style={{
        display: "flex",
        marginBottom: "50px",
        padding: "0",
        maxWidth: "none",
        margin: "0",
      }}
    >
      <ProfileAside activeBtnPath="my-products" breakpoint="lg" />
      <ProductManager
        header={title.header}
        subheader={title.subheader}
        formActions={formActions}
      />
    </Container>
  );
}
