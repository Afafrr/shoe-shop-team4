import PlainAccordion from "@/components/Display/PlainAccordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import { render } from "@testing-library/react";

describe("PlainAccordion", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <PlainAccordion>
        <AccordionSummary>Summary</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </PlainAccordion>
    );
    expect(container).toBeInTheDocument();
  });

  it("has the correct styles applied", () => {
    const { getByRole } = render(
      <PlainAccordion>
        <AccordionSummary>Summary</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </PlainAccordion>
    );

    const accordion = getByRole("button");
    expect(accordion).toHaveStyle("border: 0px");
  });
});
