"use client";
import { Container, Button } from "@mui/material";
import { ReactNode, useState } from "react";
import { addProductSchema } from "@/schemas/addProductSchema";
import { addProductAction } from "./action";
import ProductManager from "../_components/ProductManager";
import { useSession } from "next-auth/react";
import LoadingPage from "@/components/Loading/LoadingPage";
import EditModal from "../_components/modals/edit-modal/EditModal";
import { redirect } from "next/navigation";

export default function AddProduct() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <LoadingPage />;
  }
  if (!session) redirect("/auth/sign-in");

  const props = {
    header: "Add a Product",
    subheader:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  };
  const formActions = {
    schema: addProductSchema,
    submitAction: addProductAction,
  };

  let tempProduct = {
    id: "1234",
    name: "Jordan Air",
    price: 2012,
    color: ["11", "13"],
    gender: "3",
    brand: "9",
    description: "Great snickers for sports!",
    sizes: ["22", "23", "24"],
    image: [],
  };

  return (
    <Container sx={{ margin: "0" }}>
      <ProductManager props={props} formActions={formActions} />
    </Container>
  );
}
