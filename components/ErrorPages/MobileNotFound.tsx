import { Box } from "@mui/material";
import Image from "next/image";
import ErrorText from "../ErrorPages/ErrorText";
import ErrorButtons from "../ErrorPages/ErrorButtons";

interface MobileNotFoundProps {
  title: string;
  message: string;
  onGoBack: () => void;
  onHome: () => void;
}

export default function MobileNotFound({
  title,
  message,
  onGoBack,
  onHome,
}: MobileNotFoundProps) {
  return (
    <Box
      sx={{
        display: { xs: "block", md: "none" },
        flex: 1,
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          backgroundColor: "#E5E5E7",
          borderBottomLeftRadius: "39px",
          borderBottomRightRadius: "39px",
          position: "relative",
          overflow: "hidden",
          px: "20px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "-40px",
            overflow: "hidden",
            width: "90%",
            height: "90%",
            margin: "0 auto",
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
            position: "absolute",
            top: "36px",
            left: "0",
            right: "0",
            textAlign: "center",
            px: "20px",
          }}
        >
          <ErrorText title={title} message={message} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          pt: "10%",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          position: "absolute",
          bottom: "0",
          height: "20vh",
        }}
      >
        <ErrorButtons onGoBack={onGoBack} onHome={onHome} />
      </Box>
    </Box>
  );
}
