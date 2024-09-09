"use client";

import {
  Box,
  Button,
  Collapse,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FilterSearch } from "@/public/svg/FilterSearch";
import FiltersBar from "./_components/FiltersBar";
import Filters from "./_components/Filters";
import ProductList from "./_components/ProductList";
import { useState } from "react";

export default function Page() {
  const [filtersVisible, setFiltersVisible] = useState(true);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: filtersVisible ? "320px" : "0px",
          transition: "width 0.3s ",
        }}
      >
        <Collapse orientation="horizontal" in={filtersVisible}>
          <Box sx={{ mt: "35px", flexDirection: "column", height: 1 }}>
            <SearchInfo />
            <Filters />
          </Box>
        </Collapse>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            sx={{
              fontSize: { xs: 30, md: 45 },
              fontWeight: 500,
              mx: "20px",
              my: "15px",
            }}
          >
            Search results
          </Typography>
          <Button
            onClick={() => setFiltersVisible(!filtersVisible)}
            size="large"
            color="inherit"
            sx={{ display: { xs: "none", md: "block" }, mr: "20px" }}
          >
            <Typography color="textSecondary">
              {filtersVisible ? "Hide Filters" : "Show Filters"}{" "}
              <FilterSearch />
            </Typography>
          </Button>
        </Box>
        <Divider sx={{ display: { xs: "block", md: "none" } }} />
        <Stack spacing={1} sx={{ mx: "20px", mt: 1 }}>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <SearchInfo />
          </Box>
          <ProductList />
        </Stack>
      </Box>
    </Box>
  );
}

function SearchInfo() {
  return (
    <>
      <Typography color="textSecondary">Shoes/Search</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize="20px" fontWeight={500}>
          Search here (Count)
        </Typography>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <FiltersBar drawerContent={<Filters />} />
        </Box>
      </Stack>
    </>
  );
}
