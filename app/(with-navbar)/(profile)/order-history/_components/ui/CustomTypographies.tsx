import { styled, Typography, TypographyProps } from "@mui/material";

export const BoldTypography = styled((props: TypographyProps) => (
  <Typography {...props} />
))(({ theme }) => ({
  fontWeight: 700,
  fontSize: "14px",
}));

export const SecondaryTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "14px",
}));
