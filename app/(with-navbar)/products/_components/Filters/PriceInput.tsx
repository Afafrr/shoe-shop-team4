import { PlainAccordion } from "./CheckBoxInputGroup";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { SliderElement } from "react-hook-form-mui";
import React from "react";

function PriceInput() {
  return (
    <Box sx={{ width: { sm: "100%", md: "175px" } }}>
      <PlainAccordion sx={{ pl: "30px" }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ padding: { xs: "5px", md: 0 } }}
        >
          Max. Price
        </AccordionSummary>
        <AccordionDetails>
          <SliderElement name="price" min={0} max={10000} />
        </AccordionDetails>
      </PlainAccordion>
      <Divider />
    </Box>
  );
}

export default React.memo(PriceInput);
