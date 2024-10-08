import { toast } from "sonner";
import { Alert } from "@mui/material";

export default function infoToast(message: string) {
  return toast.custom((t) => (
    <Alert severity="info" onClose={() => toast.dismiss(t)}>
      {message}
    </Alert>
  ));
}
