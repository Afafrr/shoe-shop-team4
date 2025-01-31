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
import { useState } from "react";
import { FiltersType } from "@/types/types";
import SearchInfo from "./SearchInfo";
import ProductList from "./ProductList";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: FiltersType;
}) {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [count, setCount] = useState(0);
  const hasSearch = "search" in searchParams;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          maxWidth: "175px",
          width: "auto",
        }}
      >
        <Collapse
          orientation="horizontal"
          in={filtersVisible}
          sx={{ mt: "35px", height: 1 }}
        >
          <SearchInfo
            hasSearch={hasSearch}
            count={count}
            defaultFilters={searchParams}
          />
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
            {hasSearch ? "Search results" : "All products"}
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
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <SearchInfo
              hasSearch={hasSearch}
              count={count}
              defaultFilters={searchParams}
            />
          </Box>
          <ProductList
            setShoesCount={(num: number) => setCount(num)}
            filters={searchParams}
          />
        </Stack>
      </Box>
    </Box>
  );
}
