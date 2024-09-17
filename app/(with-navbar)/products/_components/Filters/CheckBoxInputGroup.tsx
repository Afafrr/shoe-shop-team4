import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  styled,
} from "@mui/material";
import { CheckboxButtonGroup } from "react-hook-form-mui";
import { useQuery } from "@tanstack/react-query";
import { capitalizeWord, FieldOption, getFieldOptions } from "../../_lib/utils";

type CheckBoxInputGroupProps = {
  name: FieldOption | "gender" | "brand" | "color";
  open?: boolean;
};

export function CheckBoxInputGroup({ name }: CheckBoxInputGroupProps) {
  let fieldOption: FieldOption;
  if (name === "gender" || name === "brand" || name === "color") {
    fieldOption = name + "s";
  } else {
    fieldOption = name;
  }

  const { data } = useQuery({
    queryKey: [fieldOption],
    queryFn: () => getFieldOptions(fieldOption),
    select: (data) => data.data,
  });

  const optionsFetched = data?.map((item) => {
    if (name === "sizes")
      return {
        id: item.attributes.value.toString(),
        label: item.attributes.value,
      };
    return { id: item.attributes.name, label: item.attributes.name };
  });

  return (
    <>
      <PlainAccordion sx={{ pl: { xs: "30px", md: "20px" } }}>
        <AccordionSummary sx={{ padding: 0 }} expandIcon={<ExpandMore />}>
          {capitalizeWord(name)}
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxButtonGroup name={name} options={optionsFetched || []} />
        </AccordionDetails>
      </PlainAccordion>
      <Divider />
    </>
  );
}

export const PlainAccordion = styled(Accordion)({
  boxShadow: "none",
  border: "none",
  "&:before": {
    display: "none",
  },
});
