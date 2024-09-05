"use client";
import { Box } from "@mui/material";
import NotFoundComponent from "@/app/_components/NotFoundComponent";
import { useRouter } from "next/navigation";

type NotFoundProps = {
  title?: string;
  message?: string;
}

export default function NotFound({
  title = "We lost that page...",
  message = "Sorry, but the page you’re looking for is not here anymore.",
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <NotFoundComponent
        title={title}
        message={message}
        onGoBack={handleGoBack}
        onHome={handleHome}
      />
    </Box>
  );
}
