import { Accordion, styled } from "@mui/material";

const PlainAccordion = styled(Accordion)({
  boxShadow: "none",
  border: "none",
  "&:before": {
    display: "none",
  },
});

export default PlainAccordion;
