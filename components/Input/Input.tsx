import { InputLabel, Stack, Typography } from "@mui/material";
import { TextFieldElement, TextFieldElementProps } from "react-hook-form-mui";

import WarningIcon from "../Form/WarningIcon";

export default function Input({
  props,
  label,
  disabled
}: {
  props: TextFieldElementProps;
  label: string;
  disabled?: boolean;
}) {
  return (
    <Stack>
      <InputLabel htmlFor={label} sx={{ fontWeight: 500 }}>
        {label}{" "}
        {props?.required ? (
          <Typography variant="caption" color={"red"} fontWeight={500}>
            *
          </Typography>
        ) : (
          ""
        )}
      </InputLabel>

      <TextFieldElement
        {...props}
        id={label}
        name={props.name}
        disabled={disabled}
        aria-disabled={disabled}
        FormHelperTextProps={{
          component: (item) => {
            return (
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
                <WarningIcon /> {item.children}
              </Typography>
            );
          },
          error: true,
          sx: {
            color: "#FE645E",
            fontWeight: 400,
          },
        }}
        sx={{
          mt: "5px",
          ":placeholder-shown": {
            color: "#5C5C5C",
            fontWeight: 300,
          },
        }}
        inputProps={{
          style: {
            height: "8px",
            border: "0.7px solid #221f1f",
            borderRadius: "5.58px",
          },
        }}
      />
    </Stack>
  );
}
