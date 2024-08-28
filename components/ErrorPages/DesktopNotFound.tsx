import { Box, Grid } from "@mui/material";
import Image from "next/image";
import ErrorText from "../ErrorPages/ErrorText";
import ErrorButtons from "../ErrorPages/ErrorButtons";

interface DesktopNotFoundProps {
  title: string;
  message: string;
  onGoBack: () => void;
  onHome: () => void;
}

export default function DesktopNotFound({
  title,
  message,
  onGoBack,
  onHome,
}: DesktopNotFoundProps) {
  return (
    <Box sx={{ display: { xs: "none", md: "block" }, flex: 1 }}>
      <Grid container sx={{ height: "100vh" }}>
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
        <Grid
          item
          xs={12}
          md={6}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Image
              src="/ErrorPages/404.png"
              alt="Error 404"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
