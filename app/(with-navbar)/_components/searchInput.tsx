import { Close, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import SearchForm from "./SearchForm";
import { useSearchParams } from "next/navigation";

export default function SearchInput() {
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const searchInput = searchParams.get("search");

  const handleDrawerToggle = () => {
    setSearchDrawerOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ height: 200 }}>
      <Box
        sx={{
          m: 4,
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        {!isMobileScreen && (
          <Box sx={{ mr: 2 }}>
            <Image src="/logo.svg" alt="Logo" width={40} height={30} />
          </Box>
        )}
        <SearchForm
          isDrawerOpen={searchDrawerOpen}
          defaultSearch={searchInput}
          handleDrawerToggle={handleDrawerToggle}
        />
        <IconButton
          sx={{ ml: 2, alignSelf: "start" }}
          onClick={handleDrawerToggle}
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Box>
        {isMobileScreen ? (
          <IconButton
            size="large"
            color="inherit"
            onClick={handleDrawerToggle}
            data-testid="screen-view-button"
          >
            <Search />
          </IconButton>
        ) : (
          <ButtonSearch
            toggleDrawer={handleDrawerToggle}
            searchInput={searchInput}
          />
        )}
      </Box>

      <Drawer
        anchor="top"
        variant="temporary"
        open={searchDrawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </>
  );
}

type ToggleDrawerProps = {
  toggleDrawer: () => void;
  searchInput: string | null;
};

function ButtonSearch({ toggleDrawer, searchInput }: ToggleDrawerProps) {
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
      {searchInput || "Search"}
    </Button>
  );
}
