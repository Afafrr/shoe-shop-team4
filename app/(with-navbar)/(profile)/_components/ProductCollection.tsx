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
      <Box paddingLeft={"20px"}>
        <Typography
          variant="h4"
          fontWeight={500}
          fontSize={{ xs: "30px", md: "45px" }}
          sx={{
            mt: { xs: "8px", md: "15px" },
            position: "relative",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Grid container columns={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
        {children}
      </Grid>
    </Stack>
  );
}
