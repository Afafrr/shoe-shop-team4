import Input from "./Input";
import { Option } from "@/types/Product";
import { MenuItem } from "@mui/material";

// This component provides a basic select input.

type SelectProps = {
  name: string;
  label: string;
  options: Option[] | null;
  sizes?: {
    width: string;
    height?: string;
  };
  disabled?: boolean;
  children?: React.ReactNode;
};
export default function CustomSelect({
  name,
  label,
  options,
  sizes,
}: SelectProps) {
  return (
    <Input
      key={label}
      label={label}
      props={{
        name: name,
        required: true,
        placeholder: "Male",
        type: "text",
        select: true,
        autoComplete: name,
      }}
      sizes={sizes}
    >
      {options ? (
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      ) : (
        <MenuItem key="error" value="0" disabled>
          unable to fetch {label}
        </MenuItem>
      )}
    </Input>
  );
}
