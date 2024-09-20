"use client";

import { useState } from "react";

import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import NextLink from "next/link";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Avatar, Link } from "@mui/material";

import SearchInput from "./searchInput";
import SideBar from "./sidebar";
import CartIcon from "./CartIcon";
import { useCart } from "@/contexts/Cart";
import NextMuiLink from "@/components/Profile/NextMuiLink";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { getCartItemCount } = useCart();

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

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
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

            <SearchInput />
            <IconButton size="large" color="inherit">
              <CartIcon count={getCartItemCount()} />
            </IconButton>
            {isLoggedIn && (
              <Link
                href="/settings"
                component={NextLink}
                sx={{ textDecoration: "none" }}
              >
                <Avatar alt="User logged In" sx={{ width: 24, height: 24 }}>
                  U
                </Avatar>
              </Link>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" color="inherit">
              <CartIcon count={getCartItemCount()} />
            </IconButton>
            <SearchInput />
            <SideBar isLoggedIn={isLoggedIn} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
