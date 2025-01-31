"use client";
import { Stack, Typography, SxProps, Box } from "@mui/material";
import { useTheme } from "@mui/material";
//icons imports
import { LogoutIcon } from "@/public/svg/LogoutIcon";
import { SettingsIcon } from "@/public/svg/SettingsIcon";
import CartIcon from "@/app/(with-navbar)/_components/CartIcon";
import { signOut } from "next-auth/react";
import NextMuiLink from "./NextMuiLink";
import FavoriteIcon from "@/public/svg/FavoriteIcon";
import OrderHistoryIcon from "@/public/svg/OrderHistoryIcon";
import RecentIcon from "@/public/svg/RecentIcon";
import { usePathname } from "next/navigation";

export const AsideNavbar = ({ parentsSX }: { parentsSX: SxProps }) => {
  const pathname = usePathname();

  const { palette } = useTheme();
  const activeBtnColor = palette.primary.main;
  const defaultColor = "#000000";
  const asideButtons = [
    {
      label: "My Products",
      Icon: CartIcon,
      href: "/my-products",
    },
    {
      label: "Order history",
      Icon: OrderHistoryIcon,
      href: "/order-history",
    },
    {
      label: "My Wishlist",
      Icon: FavoriteIcon,
      href: "/my-wishlist",
    },
    {
      label: "Recently viewed",
      Icon: RecentIcon,
      href: "/recently-viewed",
    },
    {
      label: "Settings",
      Icon: SettingsIcon,
      href: "/settings",
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
        const color = href === `${pathname}` ? activeBtnColor : defaultColor;

        return label === "Logout" ? (
          <LogoutButton key={label} Icon={Icon} />
        ) : (
          <AsideLinkButton
            key={label}
            Icon={Icon}
            href={href}
            color={color}
            label={label}
          />
        );
      })}
    </Stack>
  );
};

type IconType =
  | (({ count }: { count?: number }) => JSX.Element)
  | (({ color }: { color?: string }) => JSX.Element);

const LogoutButton = ({ Icon }: { Icon: IconType }) => {
  const defaultColor = "#000000";

  return (
    <Box
      onClick={() => signOut({ callbackUrl: "" })}
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
        Logout
      </Typography>
    </Box>
  );
};

type AsideLinkButtonProps = {
  Icon: IconType;
  href: string;
  color: string;
  label: string;
};

const AsideLinkButton = ({
  Icon,
  href,
  label,
  color,
}: AsideLinkButtonProps) => {
  return (
    <NextMuiLink
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
    </NextMuiLink>
  );
};
