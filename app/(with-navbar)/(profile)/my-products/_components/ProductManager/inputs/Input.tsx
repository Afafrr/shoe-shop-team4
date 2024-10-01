import {
  InputBaseComponentProps,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import {
  TextFieldElement,
  TextFieldElementProps,
  useFormContext,
} from "react-hook-form-mui";
import { InputProps as MuiInputProps } from "@mui/material/Input";

import WarningIcon from "@/components/Form/WarningIcon";
import { ReactNode, useState } from "react";

// This is a custom input component.

export default function Input({
  props,
  label,
  disabled,
  mutations,
  inputProps,
  componentStyle,
  sizes,
  isControlled = false,
  children,
}: {
  props: TextFieldElementProps;
  label: string;
  disabled?: boolean;
  mutations?: Partial<MuiInputProps>;
  inputProps?: InputBaseComponentProps | undefined;
  componentStyle?: React.InputHTMLAttributes<HTMLInputElement>;
  sizes?: { width: string; height?: string };
  isControlled?: boolean;
  children?: ReactNode;
}) {
  const { getValues, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState(getValues(props.name));

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let value = event.target.value;
    setValue(props.name, value, { shouldValidate: true });
    setInputValue(value);
  }
  return (
    <Stack width={sizes?.width}>
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
        inputProps={inputProps}
        name={props.name}
        disabled={disabled}
        aria-disabled={disabled}
        value={isControlled ? inputValue : undefined}
        onChange={isControlled ? handleChange : undefined}
        InputProps={mutations}
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
          ...componentStyle,
          mt: "5px",
          ":placeholder-shown": {
            color: "#5C5C5C",
            fontWeight: 300,
          },
        }}
      >
        {children}
      </TextFieldElement>
    </Stack>
  );
}
