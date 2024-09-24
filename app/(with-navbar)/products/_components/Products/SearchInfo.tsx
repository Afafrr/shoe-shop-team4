import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import FiltersBar from "../Filters/FiltersBar";
import Filters from "../Filters/Filters";
import { FiltersType } from "@/types/types";

type SearchInfoProps = {
  hasSearch: Boolean;
  count: number;
  defaultFilters: FiltersType;
};

export default function SearchInfo({
  hasSearch,
  count,
  defaultFilters,
}: SearchInfoProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const searchField = defaultFilters.search && defaultFilters.search[0];

  return (
    <Box sx={{ mx: { xs: "20px", md: 0 } }}>
      {hasSearch && (
        <Typography
          color="textSecondary"
          pl={{ md: "20px" }}
        >{`Shoes/${searchField}`}</Typography>
      )}
      <Stack
        direction={{ xs: `${hasSearch ? "row" : "row-reverse"}`, md: "column" }}
        justifyContent="space-between"
        alignItems={{ xs: "center", md: "start" }}
      >
        {hasSearch && (
          <Typography fontSize="20px" pl={{ md: "20px" }} fontWeight={500}>
            {searchField} ({count})
          </Typography>
        )}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <FiltersBar
            drawerContent={<Filters defaultFilters={defaultFilters} />}
          />
        </Box>
        {isDesktop && <Filters defaultFilters={defaultFilters} />}
      </Stack>
    </Box>
  );
}
