import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  BoldTypography,
  SecondaryTypography,
} from "@/app/(with-navbar)/(profile)/order-history/_components/ui/CustomTypographies";

const theme = createTheme(); // use your custom theme if applicable

describe("Typography components", () => {
  it("renders BoldTypography with the correct fontWeight and fontSize", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <BoldTypography>Bold Text</BoldTypography>
      </ThemeProvider>
    );

    const typographyElement = getByText("Bold Text");
    expect(typographyElement).toHaveStyle({
      fontWeight: 700,
      fontSize: "14px",
    });
  });

  it("renders SecondaryTypography with the correct color and fontSize", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SecondaryTypography>Secondary Text</SecondaryTypography>
      </ThemeProvider>
    );

    const typographyElement = getByText("Secondary Text");

    expect(typographyElement).toHaveStyle({
      color: theme.palette.text.secondary,
      fontSize: "14px",
    });
  });
});
