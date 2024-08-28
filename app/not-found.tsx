"use client";
import { Box } from "@mui/material";
import DesktopNotFound from "../components/ErrorPages/DesktopNotFound";
import MobileNotFound from "../components/ErrorPages/MobileNotFound";
import { useRouter } from "next/navigation";

interface NotFoundProps {
  title?: string;
  message?: string;
}

export default function NotFound({
  title = "Error 404",
  message = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
}: NotFoundProps) {
  
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
      <DesktopNotFound
        title={title}
        message={message}
        onGoBack={handleGoBack}
        onHome={handleHome}
      />
      <MobileNotFound
        title={title}
        message={message}
        onGoBack={handleGoBack}
        onHome={handleHome}
      />
    </Box>
  );
}
