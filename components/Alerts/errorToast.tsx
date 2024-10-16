import { toast } from "sonner";
import { Alert } from "@mui/material";

export default function errorToast(message: string) {
  return toast.custom((t) => (
    <Alert severity="error" onClose={() => toast.dismiss(t)}>
      {message}
    </Alert>
  ));
}
