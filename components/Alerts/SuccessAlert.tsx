import { Alert, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
export default function SuccessAlert({ message }: { message: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, []);

  return isVisible
    ? createPortal(
        <Box
          sx={{
            display: isVisible ? "flex" : "none",
            justifyContent: "center",
            position: "fixed",
            top: "50px",
            width: 1,
            height: "auto",
            zIndex: 10,
          }}
        >
          <Alert
            severity="success"
            sx={{
              position: "relative",
              width: "fit-content",
            }}
          >
            {message}
          </Alert>
        </Box>,
        document.body
      )
    : null;
}
