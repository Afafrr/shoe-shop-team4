"use client";

import { ReactNode, useState } from "react";

import { Button, Container, Modal, Box } from "@mui/material";
import { addProductSchema } from "@/schemas/addProductSchema";
import { editProductAction } from "./action";
import ProductFormPage from "../new/_components/ProductFormPage";

export type ProductFormSchema = {
  name: string;
  price: number;
  color: string[];
  gender: string;
  brand: string;
  description: string;
  image: File[];
};

type FormProps = {
  children?: ReactNode;
};

export default function Form({ children }: FormProps) {
  const [open, setOpen] = useState(false); // State to control modal open/close

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal
  const handleClose = () => setOpen(false);
  const props = {
    header: "Edit Product",
    subheader:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  };
  const formActions = {
    schema: addProductSchema,
    submitAction: editProductAction,
  };
  return (
    <Container disableGutters sx={{ width: { lg: "100%" } }}>
      <GetModal open={open} handleClose={handleClose}>
        <ProductFormPage props={props} formActions={formActions} />
      </GetModal>

      <Button
        type="button"
        onClick={handleOpen}
        sx={{
          width: { xs: "200px", lg: "150px" },
          marginTop: { xs: "54.55px", lg: "0" },
          position: { lg: "absolute" },
          top: { lg: "25px" },
          right: { lg: "40px" },
          py: "25px",
          borderRadius: "5.58px",
          backgroundColor: "#FE645E",
          color: "white",
          height: { xs: "60px", lg: "34px" },
          fontWeight: 500,
          textTransform: "none",
          alignSelf: { xs: "center", lg: "unset" },
        }}
      >
        Save
      </Button>
    </Container>
  );
}

type ModalType = {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
};
function GetModal({ open, handleClose, children }: ModalType) {
  // Style for the modal
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "100px",
    left: "165px",
    right: "165px",
    bottom: "-5px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflowY: "auto",
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableScrollLock
    >
      <Box sx={{ ...modalStyle }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          Close
        </Button>
        {children}
      </Box>
    </Modal>
  );
}
