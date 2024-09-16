import { Close, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function SearchInput() {
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setSearchDrawerOpen((prevState) => !prevState);
  };

  const drawerMobile = (
    <Box sx={{ height: 200 }}>
      <Box
        sx={{
          m: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextSearch />
        <IconButton sx={{ ml: 2 }} onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
    </Box>
  );

  const drawerFullScreen = (
    <Box sx={{ height: 200 }}>
      <Box
        sx={{
          m: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ mr: 2 }}>
          <Image src="/logo.svg" alt="Logo" width={40} height={30} />
        </Box>
        <TextSearch />
        <IconButton sx={{ ml: 2 }} onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Box>
        {isMobileScreen ? (
          <IconButton size="large" color="inherit" onClick={handleDrawerToggle}>
            <Search />
          </IconButton>
        ) : (
          <ButtonSearch toggleDrawer={handleDrawerToggle} />
        )}
      </Box>

      <Drawer
        anchor="top"
        variant="temporary"
        open={searchDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {isMobileScreen ? drawerMobile : drawerFullScreen}
      </Drawer>
    </>
  );
}

function TextSearch() {
  return (
    <TextField
      sx={{ flexGrow: 1 }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        sx: {
          borderRadius: 28,
          width: "80%",
          mx: "auto",
        },
      }}
      placeholder="Search"
    />
  );
}

type ToggleDrawerProps = {
  toggleDrawer: () => void;
};

function ButtonSearch({ toggleDrawer }: ToggleDrawerProps) {
  return (
    <Button
      onClick={toggleDrawer}
      startIcon={<Search />}
      sx={{
        justifyContent: "flex-start",
        padding: "6px 16px",
        borderRadius: "28px",
        border: "1px solid #494949",
        color: "inherit",
        width: { md: 200, lg: 250 },
      }}
      size="small"
    >
      Search
    </Button>
  );
}
