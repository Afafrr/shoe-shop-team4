import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { TextFieldElementProps, useFormContext } from "react-hook-form-mui";
import { Typography } from "@mui/material";
import WarningIcon from "@/components/Form/WarningIcon";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type ChipProps = {
  label: string;
  options: { value: string; label: string }[];
  props: TextFieldElementProps;
  disabled?: boolean;
  inputStyle?: React.InputHTMLAttributes<HTMLInputElement>;
  size?: string;
  children?: React.ReactNode;
};

export default function ChipSelect({ label, options, props }: ChipProps) {
  const [colorList, setColorList] = useState<string[]>([]);
  const {
    formState: { errors },
    setValue,
  } = useFormContext();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const {
      target: { value },
    } = event;

    setColorList([...(value as string[])]);
    setValue("color", [...(value as string[])]);
    return {
      ...event,
      target: {
        ...event.target,
        value: typeof value === "string" ? value.split(",") : value,
      },
    };
  };

  return (
    <div>
      <InputLabel htmlFor={label} sx={{ fontWeight: 500 }}>
        {label}
        {props?.required ? (
          <Typography variant="caption" color={"red"} fontWeight={500}>
            *
          </Typography>
        ) : (
          ""
        )}
      </InputLabel>

      <Select
        id={label}
        sx={{ width: "100%" }}
        required
        multiple
        value={colorList || []}
        onChange={(event) => {
          handleChange(event);
        }}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => {
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => {
                const selectedOption = options.find(
                  (option) => option.value === value
                );
                return (
                  <Chip
                    key={selectedOption!.value}
                    label={selectedOption!.label}
                  />
                );
              })}
            </Box>
          );
        }}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errors.color ? (
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
          <WarningIcon /> {errors.color.message as string}
        </Typography>
      ) : (
        ""
      )}
    </div>
  );
}
