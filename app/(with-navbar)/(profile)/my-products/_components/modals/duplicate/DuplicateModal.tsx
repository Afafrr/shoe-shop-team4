"use client";
import { productSchema } from "@/schemas/productSchema";
import { EditProduct } from "@/types/Product";
import { ContextType } from "@/types/types";
import { emptyFormValues } from "../../ProductManager/ProductForm/FormPage";
import { useQueryClient } from "@tanstack/react-query";
import successToast from "@/components/Alerts/successToast";
import { addProductAction } from "../../../new/action";
import ProductModal from "../ProductModal";

// This is a modal that pops when the user clicks on Duplicate product. Uses same template as AddProduct page: 'ProductManager.tsx'
// This component takes:
//    `open` and `handleClose` props to manage the modal's state
//    `Product`, a product of type 'EditProduct' with all properties to fill default form,
//    `id` property present in type `EditProduct` is unnecessary here.

type ModalType = {
  open: boolean;
  handleClose: () => void;
  product: EditProduct | undefined;
};

export default function DuplicateModal({
  open,
  handleClose,
  product,
}: ModalType) {
  const { id, ...formProduct } = product ?? { id: "", ...emptyFormValues };
  const defaultValues = formProduct;
  const queryClient = useQueryClient();

  const title = {
    header: "Duplicate Product",
    subheader:
      "Update product names, adjust pricing, and assign the correct brand and categories. Easily manage product details like colors, sizes, and gender to ensure accurate listings. Upload images and fine-tune descriptions to present your products in the best light.",
  };

  const formActions = {
    schema: productSchema,
    submitAction: (formData: FormData, context: ContextType) => {
      return addProductAction(formData, context);
    },
    successFn: async () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
      successToast("Product added successfully!");
      return handleClose();
    },
    defaultForm: defaultValues,
  };

  return (
    <ProductModal
      open={open}
      formActions={formActions}
      handleClose={handleClose}
      title={title}
    />
  );
}
