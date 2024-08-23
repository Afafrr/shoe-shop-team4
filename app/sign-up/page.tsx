import Image from "next/image";
import Link from "next/link";

import { Box, Container, Divider, Stack, Typography } from "@mui/material";

import SignupForm from "./_components/SignupForm/SignupForm";

export default function SignUp() {
  return (
    <Container sx={{ p: 0 }}>
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

      <Stack mx={"20px"} spacing={"25px"}>
        <Stack spacing={"4px"}>
          <Typography fontSize={30} fontWeight={500} lineHeight={"35px"}>
            Create an account
          </Typography>

          <Typography fontWeight={300}>
            Create an account to get an easy access to your dream shopping
          </Typography>
        </Stack>

        <SignupForm  />
      </Stack>

      <Stack mt={"16px"}>
        <Link
          href="#"
          style={{
            textDecoration: "none",
            fontWeight: 500,
            textAlign: "center",
            color: "#494949",
          }}
        >
          Already have an account?
          <Typography
            component="span"
            color={"#FE645E"}
            fontWeight={600}
            ml={"5px"}
          >
            Log in
          </Typography>
        </Link>
      </Stack>
    </Container>
  );
}
