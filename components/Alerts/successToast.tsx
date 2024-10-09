import { toast } from "sonner";
import { Alert } from "@mui/material";

export default function successToast(message: string) {
  return toast.custom((t) => (
    <Alert severity="success" onClose={() => toast.dismiss(t)}>
      {message}
    </Alert>
  ));
}
