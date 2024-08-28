"use client";
import { Box } from "@mui/material";
import DesktopError500 from "../../components/ErrorPages/DesktopError500";
import MobileError500 from "../../components/ErrorPages/MobileError500";
import { useRouter } from "next/navigation";

interface Error500Props {
  title?: string;
  message?: string;
}

export default function Error500({
  title = "We lost that page",
  message = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
}: Error500Props) {
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
      <DesktopError500
        title={title}
        message={message}
        onGoBack={handleGoBack}
        onHome={handleHome}
      />
      <MobileError500 title={title} message={message} onHome={handleHome} />
    </Box>
  );
}
