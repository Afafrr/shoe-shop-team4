import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoBox from "@/app/(with-navbar)/(profile)/order-history/_components/ui/InfoBox";

describe("InfoBox component", () => {
  it("renders the label and value correctly", () => {
    const { getByText } = render(<InfoBox label="Label" value="Value" />);

    expect(getByText("Label")).toBeInTheDocument();
    expect(getByText("Value")).toBeInTheDocument();
  });

  it("applies correct styles based on the highlightValue prop", () => {
    const { getByText } = render(
      <InfoBox label="Label" value="Highlighted Value" highlightValue />
    );

    const valueElement = getByText("Highlighted Value");
    expect(valueElement).toHaveStyle({
      fontSize: "16px",
    });
  });

  it("applies custom sx styles", () => {
    const { container } = render(
      <InfoBox label="Label" value="Value" sx={{ justifyContent: "center" }} />
    );

    const boxElement = container.querySelector("div"); // Box element
    expect(boxElement).toHaveStyle({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
  });

  it("renders default fontSize when highlightValue is false", () => {
    const { getByText } = render(
      <InfoBox label="Label" value="Non-highlighted Value" />
    );

    const valueElement = getByText("Non-highlighted Value");
    expect(valueElement).toHaveStyle({
      fontSize: "14px", // Default fontSize when highlightValue is false
    });
  });
});
