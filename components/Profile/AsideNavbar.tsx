"use client";

import { Stack, Typography, Link, SxProps, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import NextLink from "next/link";
//icons imports
import { LogoutIcon } from "@/public/svg/LogoutIcon";
import { SettingsIcon } from "@/public/svg/SettingsIcon";
import CartIcon from "@/app/(with-navbar)/_components/CartIcon";
import { signOut } from "next-auth/react";

export type routes = "my-products" | "settings";

export const AsideNavbar = ({
  parentsSX,
  activeBtnPath,
}: {
  parentsSX: SxProps;
  activeBtnPath?: routes;
}) => {
  const { palette } = useTheme();
  const activeBtnColor = palette.primary.main;
  const defaultColor = "#000000";
  const asideButtons = [
    {
      label: "My Products",
      Icon: CartIcon,
      href: "my-products",
    },
    {
      label: "Settings",
      Icon: SettingsIcon,
      href: "settings",
    },
    {
      label: "Logout",
      Icon: LogoutIcon,
      href: "logout",
    },
  ];

  return (
    <Stack spacing={"36px"} sx={{ ...parentsSX }}>
      {asideButtons.map(({ label, Icon, href }) => {
        const color = href === activeBtnPath ? activeBtnColor : defaultColor;

        if (label === "Logout") {
          return (
            <Box
              key={label}
              onClick={() => signOut()}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                cursor: "pointer",
              }}
            >
              <Icon color={defaultColor} />
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: defaultColor,
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        }

        return (
          <Link
            component={NextLink}
            key={label}
            href={href}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              textDecoration: "none",
            }}
          >
            <Icon color={color} />
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                color: color,
              }}
            >
              {label}
            </Typography>
          </Link>
        );
      })}
    </Stack>
  );
};
