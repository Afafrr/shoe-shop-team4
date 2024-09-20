import { AsideNavbar } from "@/components/Profile/AsideNavbar";
import { Close, Login } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import NextLink from "next/link";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

type SideBarProps = {
  isLoggedIn: boolean;
};

export default function SideBar({ isLoggedIn }: SideBarProps) {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const handleDrawerToggle = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 260 }}>
      <Box sx={{ textAlign: "end" }}>
        <IconButton sx={{ m: 2 }}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {isLoggedIn ? (
          <AsideNavbar parentsSX={{ ml: "40px", mt: "30px" }} />
        ) : (
          <CustomListButtonItem description="Sign In" icon={<Login />} />
        )}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton size="large" color="inherit" onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        variant="temporary"
        open={sideNavOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

function CustomListButtonItem(item: {
  description: string;
  icon: JSX.Element;
}) {
  return (
    <ListItem key={item.description}>
      <ListItemButton LinkComponent={NextLink} href="/auth/sign-in">
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.description} />
      </ListItemButton>
    </ListItem>
  );
}
