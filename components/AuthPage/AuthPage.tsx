import Image from "next/image";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

type imageProps = {
  src: string;
  alt: string;
} & (
  | {
      size: {
        width: number;
        height: number;
      };
    }
  | {
      layout: string;
    }
);
type AuthPageProps = {
  header: string;
  subheader: string;
  image: imageProps;
  Footer?: React.ComponentType;
  CardModal?: React.ComponentType;
  children?: ReactNode;
};

export default function AuthPage({
  header,
  subheader,
  image,
  Footer,
  CardModal,
  children,
}: AuthPageProps) {
  return (
    <Container
      sx={{
        p: 0,
        display: { xs: "block", md: "flex" },
        margin: { md: "0" },
        maxWidth: { md: "none" },
        padding: { md: "0" },
        height: { md: "100vh" },
      }}
    >
      <Container
        sx={{
          width: { md: "50%" },
          margin: { md: "0" },
        }}
      >
        <Box>
          <Image
            src="/logo.png"
            alt="logo"
            width={35.31}
            height={26.52}
            priority
            style={{
              marginTop: 18,
              marginLeft: 20,
              marginBottom: 14.38,
            }}
          />
        </Box>

        <Box mb={"35px"} sx={{ display: { xs: "block", md: "none" } }}>
          <Divider sx={{ color: "#EAECF0" }} />
        </Box>

        <Stack
          ml={{ md: "125px", xs: "20px" }}
          mr={{ xs: "20px", md: "0" }}
          spacing={"25px"}
          sx={{ alignItems: { md: "flex-start" } }}
        >
          <Stack
            spacing={"4px"}
            sx={{
              alignItems: { md: "flex-start" },
              width: { md: "fit-content" },
            }}
          >
            <Typography fontSize={30} fontWeight={500} lineHeight={"35px"}>
              {header}
            </Typography>

            <Typography fontWeight={300}>{subheader}</Typography>
          </Stack>
          {children}
        </Stack>
        {Footer ? <Footer /> : ""}
      </Container>
      <Container
        sx={{
          width: "50%",
          position: "relative",
          display: { xs: "none", md: "block" },
          margin: 0,
        }}
      >
        <Image {...image}></Image>
        {CardModal ? <CardModal /> : ""}
      </Container>
    </Container>
  );
}
