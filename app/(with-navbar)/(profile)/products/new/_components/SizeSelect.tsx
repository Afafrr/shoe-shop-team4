"use client";
import { Box, Button, InputLabel, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useState } from "react";

import productData from "../data/productData";
import { useFormContext } from "react-hook-form";
import WarningIcon from "@/components/Form/WarningIcon";

type SizesProps = {
  props: {
    name: string;
    required: boolean;
  };
};
export default function SizeSelect({ props }: SizesProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  console.log("Size values: ", getValues("sizes"));
  const handleSizeClick = (size: string) => {
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter((s) => s !== size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
    setValue("sizes", selectedSizes);
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
        columns={{ xs: 5, md: 10, lg: 5 }}
      >
        {productData.sizes.map((size, index) => (
          <Grid item xs={1} md={1} lg={1} key={index}>
            <Button
              key={size}
              color={selectedSizes.includes(size) ? "primary" : "inherit"}
              variant={selectedSizes.includes(size) ? "contained" : "outlined"}
              sx={{
                fontSize: "0.75rem",
                height: "45px",
                borderRadius: "8px",
                mb: "10px",
              }}
              onClick={() => handleSizeClick(size)}
            >
              {`EU-${size}`}
            </Button>
          </Grid>
        ))}
      </Grid>
      {errors.sizes && selectedSizes.length == 0 ? (
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
