"use client";
import { Container, Button } from "@mui/material";
import { productSchema } from "@/schemas/productSchema";
import { addProductAction } from "./action";
import ProductManager from "../_components/ProductManager/ProductManager";
import { ContextType } from "@/types/types";
import ProfileAside from "../../_components/ProfileAside";
import { useEffect, useState } from "react";
import EditModal from "../_components/modals/edit-modal/EditModal";

const fileData: FileData = {
  name: "shoes-register.png",
  size: 32.3,
  url: "https://res.cloudinary.com/devc11z9p/image/upload/v1726869190/shoes_register_9ee33295f6.png", // URL to the file on the server
};
export default function AddProduct() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const getFile = async () => {
      const response = await fetch(fileData.url);
      const blob = await response.blob();
      const file = new File([blob], fileData.name, { type: blob.type });
      setFile(file);
    };
    getFile();
  }, [fileData]);

  const title = {
    header: "Add a Product",
    subheader:
      "Lorem ipsum, or ipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  };
  const formActions = {
    schema: productSchema,
    submitAction: (formData: FormData, context: ContextType) =>
      addProductAction(formData, context),
  };
  const product = {
    id: "1548",
    name: "Jordan Air",
    price: 4200,
    categories: ["5", "8", "6"],
    color: ["8"],
    gender: "4",
    brand: "13",
    description: "Jordan's own personal shoes!",
    sizes: [
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
    ],
    images: file ? [file] : [],
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
      <EditModal
        open={open}
        handleClose={() => setOpen(false)}
        product={product}
      />
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <ProfileAside activeBtnPath="my-products" breakpoint="lg" />
      <ProductManager
        header={title.header}
        subheader={title.subheader}
        formActions={formActions}
      />
    </Container>
  );
}

// types.ts (optional for type definitions)
export type FileData = {
  name: string;
  size: number;
  url: string;
};
