"use client";

import { Box, Typography, Button } from "@mui/material";
import ErrorButtons from "./ErrorButtons";

type ErrorPageProps = {
  title: string;
  message: string;
  onGoBack: () => void;
  onHome: () => void;
};

const TitleComponent = ({ title }: { title: string }) => (
  <Box
    sx={{
      marginBottom: { xs: "16px", md: "24px" },
      textAlign: { xs: "center", md: "left" },
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontSize: { xs: "30px", md: "45px" },
        fontWeight: 500,
      }}
    >
      {title}
    </Typography>
  </Box>
);

const MessageComponent = ({ message }: { message: string }) => (
  <Box
    sx={{
      marginBottom: { xs: "16px", md: "24px" },
      textAlign: { xs: "center", md: "left" },
      color: { xs: "#FFFFFF", md: "#000000" },
    }}
  >
    <Typography
      variant="body1"
      sx={{
        fontSize: { xs: "14px", md: "20px" },
      }}
    >
      {message}
    </Typography>
  </Box>
);

export default function ErrorPage({
  title,
  message,
  onGoBack,
  onHome,
}: ErrorPageProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: {
            xs: "70vh",
            md: "100vh",
          },
          backgroundImage: {
            xs: `url('/ErrorPages/mobile-500.png')`,
            md: `url('/ErrorPages/500.png')`,
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,

          marginTop: { xs: "15vh", md: "0" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: {
            xs: "none",
            md: "linear-gradient(to right, white, rgba(255, 255, 255, 0))",
          },
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "flex-start", md: "center" },
          alignItems: { xs: "center", md: "flex-start" },
          padding: { xs: "60px 0", md: "150px" },
          height: { xs: "40vh", md: "100vh" },
        }}
      >
        <TitleComponent title={title} />

        {/* error message desktop */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "flex-start",
            width: "40%",
          }}
        >
          <MessageComponent message={message} />
          <ErrorButtons onGoBack={onGoBack} onHome={onHome} />
        </Box>
      </Box>
      {/* error message mobile */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-350px",
          left: 0,
          width: "100%",
          textAlign: "center",
          display: { xs: "block", md: "none" },
          padding: "16px",
        }}
      >
        <MessageComponent message={message} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "-450px",
          left: 0,
          width: "100%",
          textAlign: "center",
          display: { xs: "block", md: "none" },
          padding: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "152px",
            height: "40px",
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            borderRadius: "10px",
          }}
          onClick={onHome}
        >
          Back to home
        </Button>
      </Box>
    </Box>
  );
}
