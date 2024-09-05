<<<<<<< HEAD
=======
"use client";
>>>>>>> effe1cf (refactor errorpages)
import { Box } from "@mui/material";
import Image from "next/image";
import ErrorText from "@/app/_components/ErrorText";
import ErrorButtons from "@/app/_components/ErrorButtons";

type ErrorComponentProps = {
  title: string;
  message: string;
  onGoBack: () => void;
  onHome: () => void;
};

export default function ErrorComponent({
  title,
  message,
  onGoBack,
  onHome,
}: ErrorComponentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "flex-start", md: "center" },
          padding: { xs: "20px", md: "0 150px" },
          zIndex: { xs: 1, md: "auto" },
          backgroundColor: { xs: "#E5E5E7", md: "#ffffff" },
        }}
      >
        <ErrorText title={title} message={message} />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <ErrorButtons onGoBack={onGoBack} onHome={onHome} />
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "70vh", md: "100vh" },
          backgroundColor: "#E5E5E7",
          position: "relative",
          borderBottomLeftRadius: { xs: "39px", md: "0px" },
          borderBottomRightRadius: { xs: "39px", md: "0px" },
          overflow: "hidden",
        }}
      >
        <Image
          src="/ErrorPages/404.png"
          alt="Error 404"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          gap: "16px",
          position: "absolute",
          bottom: "50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ErrorButtons onGoBack={onGoBack} onHome={onHome} />
      </Box>
    </Box>
  );
}
