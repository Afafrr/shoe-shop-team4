"use client";
import { Box } from "@mui/material";
import DesktopError from "./_components/DesktopError";
import MobileError from "./_components/MobileError";
import { useRouter } from "next/navigation";

type ErrorProps = {
  title?: string;
  message?: string;
}

export default function ErrorFound({
  title = "Error",
  message = "Something went wrong",
}: ErrorProps) {
  
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <DesktopError
        title={title}
        message={message}
        onGoBack={handleGoBack}
        onHome={handleHome}
      />
      <MobileError
        title={title}
        message={message}
        onGoBack={handleGoBack}
        onHome={handleHome}
      />
    </Box>
  );
}
