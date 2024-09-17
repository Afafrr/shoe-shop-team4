import { Button, Modal, Box } from "@mui/material";
import { addProductSchema } from "@/schemas/addProductSchema";
import { editProductAction } from "./action";
import ProductManager from "../../ProductManager/ProductManager";
import { ActionFunction, ProductFormSchema } from "@/types/Product";

import "./modal.css";

// This is a modal that pops when the user clicks on edit product. Uses same template as AddProduct page: 'ProductManager.tsx'
// This component takes:
//    `open` and `handleClose` props to manage the modal's state
//    `Product`, a product of type 'ProductFormSchema' with `Id` to edit on backend, and all properties to fill default form
type EditProduct = ProductFormSchema & {
  id: string;
};

type ModalType = {
  open: boolean;
  handleClose: () => void;
  product: EditProduct;
};

export default function EditModal({ open, handleClose, product }: ModalType) {
  const { id, ...formProduct } = product;
  const defaultValues = formProduct;

  const props = {
    header: "Edit Product",
    subheader:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  };
  const formActions = {
    schema: addProductSchema,
    submitAction: editProductAction as ActionFunction,
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
          props={props}
          formActions={formActions}
          productId={id}
        />
      </Box>
    </Modal>
  );
}
