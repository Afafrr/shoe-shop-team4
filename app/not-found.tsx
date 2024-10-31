"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import NotFoundComponent from "@/app/_components/NotFoundComponent";
import { useRouter } from "next/navigation";
import NavBar from "./(with-navbar)/_components/navbar";

type NotFoundProps = {
  title?: string;
  message?: string;
};

export default function NotFound({
  title = "We lost that page...",
  message = "Sorry, but the page you’re looking for is not here anymore.",
}: NotFoundProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleGoBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push("/");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!isMobileScreen && <NavBar />}
        <NotFoundComponent
          title={title}
          message={message}
          onGoBack={handleGoBack}
          onHome={handleHome}
        />
      </Box>
    </>
  );
}
