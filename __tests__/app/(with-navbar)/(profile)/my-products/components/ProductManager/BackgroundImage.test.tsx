import { render } from "@testing-library/react";
import BackgroundImage from "@/app/(with-navbar)/(profile)/my-products/_components/BackgroundImage";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

jest.mock("@mui/material/useMediaQuery");

describe("BackgroundImage Component", () => {
  it("should render the background image with correct alt text", () => {
    const { getByAltText } = render(
      <ThemeProvider theme={theme}>
        <BackgroundImage />
      </ThemeProvider>
    );
    const image = getByAltText("User abstract background image");
    expect(image).toBeInTheDocument();
  });

  it("should have correct styles for desktop view", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    const { getByAltText } = render(
      <ThemeProvider theme={theme}>
        <BackgroundImage />
      </ThemeProvider>
    );
    const image = getByAltText("User abstract background image");
    expect(image).toHaveStyle("object-fit: fill");
  });
});
