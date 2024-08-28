"use client";

import { Box, Grid } from "@mui/material";
import ErrorText from "../../components/ErrorPages/ErrorText";
import ErrorButtons from "../../components/ErrorPages/ErrorButtons";


type DesktopError500Props = {
  title: string;
  message: string;
  onGoBack: () => void;
  onHome: () => void;
};
export default function DesktopError500({
  title,
  message,
  onGoBack,
  onHome,
}: DesktopError500Props) {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        flex: 1,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `url('/ErrorPages/500.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background:
            "linear-gradient(to right, white, rgba(255, 255, 255, 0))",
          zIndex: -1,
        }}
      />
      <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
        <Grid container sx={{ height: "100vh" }}>
          {/* Left Column */}
          <Grid
            item
            xs={12}
            md={6}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            sx={{
              paddingLeft: "10%",
              boxSizing: "border-box",
              height: "100%",
              width: "50%",
            }}
          >
            <ErrorText title={title} message={message} />
            <ErrorButtons onGoBack={onGoBack} onHome={onHome} />
          </Grid>
          {/* Right Column */}
          <Grid
            item
            xs={12}
            md={6}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "50%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
              padding: 0,
            }}
          >
            {/* Right Column empty*/}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
