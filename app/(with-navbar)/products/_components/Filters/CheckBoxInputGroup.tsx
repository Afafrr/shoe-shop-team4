import { ExpandMore } from "@mui/icons-material";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
} from "@mui/material";
import { CheckboxButtonGroup } from "react-hook-form-mui";
import { useQuery } from "@tanstack/react-query";
import { capitalizeWord, FieldOption, getFieldOptions } from "../../_lib/utils";
import React, { useMemo, useState } from "react";
import PlainAccordion from "@/components/Display/PlainAccordion";

type CheckBoxInputGroupProps = {
  name: FieldOption | "gender" | "brand" | "color";
  open?: boolean;
};

function CheckBoxInputGroup({ name }: CheckBoxInputGroupProps) {
  const [expanded, setExpanded] = useState(false);

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

  const optionsFetched = useMemo(() => {
    return data?.map((item) => {
      if (name === "sizes")
        return {
          id: item.attributes.value.toString(),
          label: item.attributes.value,
        };
      return { id: item.attributes.name, label: item.attributes.name };
    });
  }, [data, name]);

  return (
    <Box sx={{ width: { sm: "100%", md: "175px" } }}>
      <PlainAccordion sx={{ pl: "30px" }}>
        <AccordionSummary
          sx={{ padding: { xs: "5px", md: 0 } }}
          expandIcon={<ExpandMore />}
          onClick={() => setExpanded(true)}
        >
          {capitalizeWord(name)}
        </AccordionSummary>
        <AccordionDetails>
          {expanded && (
            <CheckboxButtonGroup name={name} options={optionsFetched || []} />
          )}
        </AccordionDetails>
      </PlainAccordion>
      <Divider />
    </Box>
  );
}

export default React.memo(CheckBoxInputGroup);
