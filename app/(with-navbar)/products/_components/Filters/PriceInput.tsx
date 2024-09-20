import { PlainAccordion } from "./CheckBoxInputGroup";
import { AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { SliderElement } from "react-hook-form-mui";

export default function PriceInput() {
  return (
    <>
      <PlainAccordion sx={{ pl: { xs: "30px", md: "20px" } }}>
        <AccordionSummary expandIcon={<ExpandMore />} sx={{ padding: 0 }}>
          Max. Price
        </AccordionSummary>
        <AccordionDetails>
          <SliderElement name="price" min={0} max={10000} />
        </AccordionDetails>
      </PlainAccordion>
      <Divider />
    </>
  );
}
