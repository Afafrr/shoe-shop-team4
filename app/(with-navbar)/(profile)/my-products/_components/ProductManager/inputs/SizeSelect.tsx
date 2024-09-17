"use client";
import { Box, Button, InputLabel, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useEffect, useState } from "react";

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
    formState: { errors },
    getValues,
  } = useFormContext();

  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    getValues("sizes")
  );

  useEffect(() => {
    if (selectedSizes.length !== 0) {
      setValue("sizes", selectedSizes, {
        shouldValidate: selectedSizes.length == 0 ? false : true,
      });
    }
  }, [selectedSizes, setValue]);

  const handleSizeClick = (size: { value: string; label: string }) => {
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size.value)) {
        return prevSelectedSizes.filter((s) => s !== size.value);
      } else {
        return [...prevSelectedSizes, size.value];
      }
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
        columns={{ xs: 4, md: 7, lg: 4, xl: 5 }}
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
