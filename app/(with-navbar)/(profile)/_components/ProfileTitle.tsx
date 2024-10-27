import { Box, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

type ProductCollectionProps = {
  title: string;
  children: ReactNode;
};

export default function ProfileTitle({
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
        sx={{
          display: { xs: "flex", sm: "block" },
          justifyContent: "center",
          pl: { xs: "0px", md: "20px" },
        }}
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
      {children}
    </Stack>
  );
}
