import { filtersSchema } from "@/schemas/filtersSchema";
import { FiltersType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FormContainer, useForm } from "react-hook-form-mui";
import { z } from "zod";
import { CheckBoxInputGroup } from "./CheckBoxInputGroup";
import { getDefaultValues } from "../../_lib/utils";
import PriceInput from "./PriceInput";

type FieldValues = z.infer<typeof filtersSchema>;

type FiltersProps = {
  defaultFilters: FiltersType;
};

export default function Filters({ defaultFilters }: FiltersProps) {
  const router = useRouter();
  const currentParams = useSearchParams();

  const formContext = useForm<FieldValues>({
    defaultValues: getDefaultValues(defaultFilters),
    resolver: zodResolver(filtersSchema),
  });

  const { handleSubmit } = formContext;

  function onSubmit(data: FieldValues) {
    const newParams = new URLSearchParams();
    if (currentParams.has("search")) {
      newParams.set("search", currentParams.get("search")!);
    }
    Object.entries(data).forEach(([key, values]) => {
      if (Array.isArray(values)) {
        values.map((value) => {
          newParams.append(key, value);
        });
      } else {
        if (data.price) {
          newParams.append(key, values.toString());
        }
      }
    });

    const newUrl = "/products?" + newParams.toString();
    router.push(newUrl);
  }

  return (
    <Box sx={{ mt: { xs: "46px", md: "28px" }, width: "100%" }}>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <Stack spacing={2}>
          <CheckBoxInputGroup name="gender" />
          <CheckBoxInputGroup name="categories" />
          <PriceInput />
          <CheckBoxInputGroup name="brand" />
          <CheckBoxInputGroup name="color" />
          <CheckBoxInputGroup name="sizes" />
          <Button
            type="submit"
            sx={{ alignSelf: "center", width: "150px", px: 3 }}
          >
            Apply Filters
          </Button>
        </Stack>
      </FormContainer>
    </Box>
  );
}
