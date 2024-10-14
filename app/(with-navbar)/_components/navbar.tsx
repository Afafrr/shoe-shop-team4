"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import SearchInput from "./searchInput";
import SideBar from "./sidebar";
import CartIcon from "./CartIcon";
import { useCart } from "@/contexts/Cart";
import NextMuiLink from "@/components/Profile/NextMuiLink";
import WarningIcon from "@/components/Form/WarningIcon";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getData } from "@/utils/getData";
import { UserData } from "@/types/types";
import type { ResData } from "@/utils/getData";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { getCartItemCount } = useCart();
  const session = useSession();
  const { data, refetch } = useQuery<ResData<UserData>>({
    queryKey: ["userData"],
    queryFn: () => getData("users/me?populate=avatar", session?.data?.user.jwt),
  });
  const error = data?.error;
  const userData = data?.data;
  const avatar = userData?.avatar?.url;

  useEffect(() => {
    const sessionStatus = session.status === "authenticated";
    if (!userData && sessionStatus) {
      refetch();
    }
    setIsLoggedIn(sessionStatus);
  }, [session]);

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth={false} sx={{ my: { md: 1 } }}>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignContent: "center",
            }}
          >
            <NextMuiLink href="/products">
              <Image src="/logo.svg" alt="Logo" width={40} height={30} />
            </NextMuiLink>
            <Box sx={{ alignContent: "center" }}>
              <NextMuiLink
                href="/products"
                sx={{
                  ml: 3,
                  display: { xs: "none", md: "flex" },
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Products
              </NextMuiLink>
            </Box>
          </Box>
          <SearchInput />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              ml: 2,
              gap: 2,
            }}
          >
            {!isLoggedIn && (
              <Button
                variant="outlined"
                sx={{ width: 140 }}
                href="/auth/sign-in"
                LinkComponent={NextLink}
              >
                Sign In
              </Button>
            )}
            <NextMuiLink href="/chart">
              <IconButton size="large" color="inherit">
                <CartIcon color="black" count={getCartItemCount()} />
              </IconButton>
            </NextMuiLink>
            {isLoggedIn && (
              <NextMuiLink href={"/settings"} sx={{ textDecoration: "none" }}>
                <Avatar
                  alt="User logged In"
                  src={avatar}
                  sx={{ width: 24, height: 24 }}
                >
                  {avatar ? null : userData?.firstName?.slice(0, 1)}
                  {error ? <WarningIcon /> : null}
                </Avatar>
              </NextMuiLink>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <NextMuiLink href="/chart">
              <IconButton size="large" color="inherit">
                <CartIcon count={getCartItemCount()} />
              </IconButton>
            </NextMuiLink>
            <SideBar isLoggedIn={isLoggedIn} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
