"use client";
import { Container, Stack, Typography } from "@mui/material";
import ProductFormPage from "./ProductForm/FormPage";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { ProductFormSchema, ActionFunction } from "@/types/Product";

// This page is a template for a product form. Works for both Add product and Edit product components.

type pageType = {
  props: {
    header: string;
    subheader?: string;
  };
  formActions: {
    schema: z.ZodSchema<FieldValues>;
    submitAction: ActionFunction;
    defaultForm?: ProductFormSchema;
  };
  productId?: string;
};

export default function ProductManager({
  props,
  formActions,
  productId,
}: pageType) {
  const { schema, submitAction, defaultForm } = formActions;

  return (
    <Container
      id="form-page-container"
      disableGutters
      sx={{
        width: { md: "100%" },
        margin: { md: "0" },
        maxWidth: "none",
        position: "relative",
        padding: "40px",
      }}
    >
      <Stack
        mr={{ xs: "20px", md: "0" }}
        spacing={"25px"}
        sx={{ alignItems: { md: "flex-start" } }}
      >
        <PageTitle props={props} />
        <ProductFormPage
          schema={schema}
          submitFn={submitAction}
          defaultForm={defaultForm}
          productId={productId}
        ></ProductFormPage>
      </Stack>
    </Container>
  );
}

//Page title
type TitleProps = {
  props: { header: string; subheader?: string };
};
function PageTitle({ props }: TitleProps) {
  return (
    <Stack
      spacing={"15px"}
      sx={{
        alignItems: { md: "flex-start" },
        width: { md: "80%" },
      }}
    >
      <Typography fontSize={30} fontWeight={500} lineHeight={"35px"}>
        {props.header}
      </Typography>

      {props.subheader ? (
        <Typography fontWeight={300}>{props.subheader}</Typography>
      ) : (
        ""
      )}
    </Stack>
  );
}
