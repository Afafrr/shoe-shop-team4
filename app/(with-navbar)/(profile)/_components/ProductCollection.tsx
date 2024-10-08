import { Box, Grid, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

type ProductCollectionProps = {
  title: string;
  children: ReactNode;
};

export default function ProductCollection({
  title,
  children,
}: ProductCollectionProps) {
  return (
    <Stack
      width={"100%"}
      padding={"20px"}
      spacing={5}
      data-testid={`${title.replace(/\s+/g, "-").toLowerCase()}-page`}
    >
      <Box
        paddingLeft={"20px"}
        sx={{ display: { xs: "flex", sm: "block" }, justifyContent: "center" }}
      >
        <Typography
          variant="h4"
          fontWeight={500}
          fontSize={{ xs: "30px", md: "35px" }}
          sx={{
            mt: { xs: "8px", md: "15px" },
            position: "relative",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}>
        {children}
      </Grid>
    </Stack>
  );
}
