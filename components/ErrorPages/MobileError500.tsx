"use client";

import { Box, Typography, Button } from "@mui/material";


interface MobileError500Props {
  title: string;
  message: string;
  onHome: () => void;
}

export default function MobileError500({
  title,
  message,
  onHome,
}: MobileError500Props) {


  return (
    <Box
      sx={{
        display: { xs: "block", md: "none" },
        flex: 1,
        zIndex: 1,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "15vh",
          backgroundColor: "#FFFFFF",
          width: "100%",
          padding: "0 16px",
          boxSizing: "border-box",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          paddingTop: "15%",
          paddingBottom: "8%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "30px",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>{" "}
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "70vh",
          backgroundImage: `url('/ErrorPages/mobile-500.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            right: "16px",
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: "15vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "32px",
          padding: "0 16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "233px",
            height: "40px",
            backgroundColor: "#FE645E",
            color: "#FFFFFF",
            borderRadius: "10px",
          }}
          onClick={onHome}
        >
          Back Home
        </Button>
      </Box>
    </Box>
  );
}
