"use client";
import { Button, Modal, Box } from "@mui/material";
import ProductManager from "../ProductManager/ProductManager";
import { ActionFunction, ProductFormSchema } from "@/types/Product";
import ActionConfirmationModal from "../ProductManager/modals/ActionConfirmationModal";
import "./modal.css";
import { useEffect, useState } from "react";
import { ZodType } from "zod";
import { FieldValues } from "react-hook-form";

// This is a modal that pops when the user clicks on edit product. Uses same template as AddProduct page: 'ProductManager.tsx'
// This component takes:
//    `open` and `handleClose` props to manage the modal's state
//    `Product`, a product of type 'EditProduct' with all properties to fill default form, and an additional `Id` for backend request.

type ModalProps = {
  open: boolean;
  title: {
    header: string;
    subheader: string;
  };
  formActions: {
    schema: ZodType<FieldValues>;
    submitAction: ActionFunction;
    successFn?: () => void;
    defaultForm?: ProductFormSchema;
  };
  handleClose: () => void;
};

export default function ProductModal({
  open,
  title,
  handleClose,
  formActions,
}: ModalProps) {
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    if (open) {
      setConfirmModal(false); // Reset confirmation modal when the main modal is opened
    }
  }, [open]);

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
