"use client";
import { Button, Modal, Box } from "@mui/material";
import { productSchema } from "@/schemas/productSchema";
import { editProductAction } from "./action";
import ProductManager from "../../ProductManager/ProductManager";
import { EditProduct } from "@/types/Product";
import ActionConfirmationModal from "../../ProductManager/modals/ActionConfirmationModal";

import "./modal.css";
import { ContextType } from "@/types/types";
import { useEffect, useState } from "react";

// This is a modal that pops when the user clicks on edit product. Uses same template as AddProduct page: 'ProductManager.tsx'
// This component takes:
//    `open` and `handleClose` props to manage the modal's state
//    `Product`, a product of type 'EditProduct' with all properties to fill default form, and an additional `Id` for backend request.

type ModalType = {
  open: boolean;
  handleClose: () => void;
  product: EditProduct;
};

export default function EditModal({ open, handleClose, product }: ModalType) {
  const [confirmModal, setConfirmModal] = useState(false);
  const { id, ...formProduct } = product;
  const defaultValues = formProduct;

  useEffect(() => {
    if (open) {
      setConfirmModal(false); // Reset confirmation modal when the main modal is opened
    }
  }, [open]);

  const title = {
    header: "Edit Product",
    subheader:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  };
  const formActions = {
    schema: productSchema,
    submitAction: (formData: FormData, context: ContextType) =>
      editProductAction(formData, context, id),
    successFn: () => handleClose(),
    defaultForm: defaultValues,
  };

  return (
    <Modal
      open={open}
      onClose={() => setConfirmModal(true)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableScrollLock
    >
      <Box
        className="modal"
        sx={{
          bgcolor: "background.paper",
          left: { xs: "120px" },
          right: { xs: "120px" },
        }}
      >
        <ActionConfirmationModal
          name="Discard"
          message="Are you sure you want to discard all changes?"
          open={confirmModal}
          handleClose={() => setConfirmModal(false)}
          actionFn={handleClose}
        />

        <Button
          variant="outlined"
          onClick={() => setConfirmModal(true)}
          className="close-button"
        >
          Close
        </Button>
        <ProductManager
          header={title.header}
          subheader={title.subheader}
          formActions={formActions}
        />
      </Box>
    </Modal>
  );
}

// Example product =>
//  const product = {
//   id: "1552",
//   name: "Jordan Air",
//   price: 4200,
//   categories: ["5", "8", "6"],
//   color: ["8"],
//   gender: "4",
//   brand: "13",
//   description: "Jordan's own personal shoes!",
//   sizes: [
//     "13",
//     "14",
//     "15",
//     "16",
//     "17",
//     "18",
//     "19",
//     "20",
//     "21",
//     "22",
//     "23",
//     "24",
//     "25",
//   ],
//   images: [file, file1, file2],
// };
