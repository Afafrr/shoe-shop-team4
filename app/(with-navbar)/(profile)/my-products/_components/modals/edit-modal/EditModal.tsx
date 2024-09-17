import { Button, Modal, Box } from "@mui/material";
import { productSchema } from "@/schemas/productSchema";
import { editProductAction } from "./action";
import ProductManager from "../../ProductManager/ProductManager";
import { ActionFunction, EditProduct } from "@/types/Product";

import "./modal.css";
import { ContextType } from "@/types/types";

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
  const { id, ...formProduct } = product;
  const defaultValues = formProduct;

  const title = {
    header: "Edit Product",
    subheader:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  };
  const formActions = {
    schema: productSchema,
    submitAction: (formData: FormData, context: ContextType) =>
      editProductAction(formData, context, id),
    defaultForm: defaultValues,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
        <Button
          variant="outlined"
          onClick={handleClose}
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
