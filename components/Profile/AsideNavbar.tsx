import { Stack, Typography, Link, SxProps } from "@mui/material";
import { useTheme } from "@mui/material";
//icons imports
import { LogoutIcon } from "@/public/svg/LogoutIcon";
import { ProductsBagIcon } from "@/public/svg/ProductsBagIcon";
import { SettingsIcon } from "@/public/svg/SettingsIcon";

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
      Icon: ProductsBagIcon,
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
        return (
          <Link
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
