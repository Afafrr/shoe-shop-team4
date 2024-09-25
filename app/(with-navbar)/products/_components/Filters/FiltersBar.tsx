import { FilterSearch } from "@/public/svg/FilterSearch";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Drawer, Button, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

type SideBarProps = {
  drawerContent: ReactNode;
};

export default function FiltersBar({ drawerContent }: SideBarProps) {
  const [filtersBarOpen, setFiltersBarOpen] = useState(false);

  const handleDrawerToggle = () => {
    setFiltersBarOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ width: 260 }}>
      <Box sx={{ textAlign: "end" }}>
        <IconButton sx={{ m: 2 }} onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      {drawerContent}
    </Box>
  );

  return (
    <>
      <Button size="large" color="inherit" onClick={handleDrawerToggle}>
        <Typography color="textSecondary">Filters</Typography> <FilterSearch />
      </Button>

      <Drawer
        anchor="right"
        variant="temporary"
        open={filtersBarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {filtersBarOpen && drawer}
      </Drawer>
    </>
  );
}
