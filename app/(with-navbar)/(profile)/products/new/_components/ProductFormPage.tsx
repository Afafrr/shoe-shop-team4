"use client";
import { Container, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import AddProductForm from "./Form/FormPage";
import { addProductAction } from "../action";
import { addProductSchema } from "@/schemas/addProductSchema";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { ContextType } from "@/types/types";
import { ProductActionResponse } from "@/types/productTypes";
type pageType = {
  children?: ReactNode;
  props: {
    header: string;
    subheader?: string;
  };
  formActions: {
    schema: z.ZodSchema<FieldValues>;
    submitAction: (
      data: FormData,
      context: ContextType
    ) => Promise<ProductActionResponse>;
  };
};

export default function ProductFormPage({ children, props }: pageType) {
  const addProductProps = {
    header: "Add a Product",
    subheader:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  };
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
        <AddProductForm
          schema={addProductSchema}
          submitFn={addProductAction}
        ></AddProductForm>{" "}
      </Stack>
    </Container>
  );
}

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
