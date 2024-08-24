import { InputLabel, Stack, Typography } from "@mui/material";
import { TextFieldElement, TextFieldElementProps } from "react-hook-form-mui";

export default function Input({
  props,
  label,
}: {
  props: TextFieldElementProps;
  label: string;
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
        sx={{
          mt: "5px",
          ":placeholder-shown": {
            color: "#5C5C5C",
            fontWeight: 300,
          },
        }}
        inputProps={{
          style: {
            height: "15px",
            border: "0.7px solid #221f1f",
            borderRadius: "5.58px",
          },
        }}
      />
    </Stack>
  );
}
