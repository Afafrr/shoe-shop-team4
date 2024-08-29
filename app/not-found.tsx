"use client";
import { Box } from "@mui/material";
import DesktopNotFound from "./_components/DesktopNotFound";
import MobileNotFound from "./_components/MobileNotFound";
import { useRouter } from "next/navigation";

type ErrorProps = {
  title?: string;
  message?: string;
}

export default function NotFound({
  title = "We lost that page",
  message = "Sorry, but the page you’re looking for is not here anymore.",
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <DesktopNotFound
        title={title}
        message={message}
        onGoBack={handleGoBack}
        onHome={handleHome}
      />
      <MobileNotFound title={title} message={message} onHome={handleHome} />
    </Box>
  );
}
