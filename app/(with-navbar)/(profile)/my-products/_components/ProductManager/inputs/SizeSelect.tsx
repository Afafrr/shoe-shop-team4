"use client";
import { Box, Button, InputLabel, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useState } from "react";

import { useFormContext } from "react-hook-form";
import WarningIcon from "@/components/Form/WarningIcon";
import { Option } from "@/types/Product";

// This component manages the 'size' formField through buttons.

type SizesProps = {
  props: {
    name: string;
    required: boolean;
  };
  options: Option[] | null;
};
export default function SizeSelect({ props, options }: SizesProps) {
  const {
    setValue,
    formState: { errors, touchedFields },
    getValues,
  } = useFormContext();

  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    getValues("sizes")
  );

  const handleSizeClick = (size: { value: string; label: string }) => {
    const prevSizes: string[] = getValues("sizes");
    const new_list = prevSizes.includes(size.value)
      ? prevSizes.filter((s) => s !== size.value)
      : [...prevSizes, size.value];

    setSelectedSizes(new_list);
    setValue("sizes", new_list, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <InputLabel sx={{ fontWeight: 500, marginBottom: "5px" }}>
        {props.name}
        {props?.required ? (
          <Typography variant="caption" color={"red"} fontWeight={500}>
            *
          </Typography>
        ) : (
          ""
        )}
      </InputLabel>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 5, md: 7, lg: 4, xl: 5 }}
      >
        {options ? (
          options.map((size, index) => (
            <Grid item xs={1} md={1} lg={1} xl={1} key={index}>
              <Button
                key={size.value}
                color={
                  selectedSizes.includes(size.value) ? "primary" : "inherit"
                }
                variant={
                  selectedSizes.includes(size.value) ? "contained" : "outlined"
                }
                sx={{
                  fontSize: "0.75rem",
                  width: "70px",
                  height: "45px",
                  borderRadius: "8px",
                  mb: "10px",
                }}
                onClick={() => handleSizeClick(size)}
              >
                {`EU-${size.label}`}
              </Button>
            </Grid>
          ))
        ) : (
          <Typography>Unable to fetch sizes</Typography>
        )}
      </Grid>
      {errors.sizes ? (
        <Typography
          color={"red"}
          sx={{
            mt: "8px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          <WarningIcon /> {errors.sizes.message as string}
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
}
