import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { z } from "zod";

const searchSchema = z.object({
  search: z.string().min(1, {
    message: "Search should not be empty",
  }),
});

type FieldValues = z.infer<typeof searchSchema>;

type SearchFormProps = {
  isDrawerOpen: Boolean;
  defaultSearch: string | null;
};

export default function SearchForm({
  isDrawerOpen,
  defaultSearch,
}: SearchFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isDrawerOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDrawerOpen]);

  const formContext = useForm<FieldValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: defaultSearch || undefined },
  });

  const { handleSubmit } = formContext;

  function onSubmit(data: FieldValues) {
    const newUrl = `/products?search=${data.search}`;
    router.push(newUrl);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <TextFieldElement
          name="search"
          inputRef={inputRef}
          size="small"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 28,
              mx: "auto",
              width: "80%",
            },
          }}
          sx={{ width: "100%" }}
          placeholder="Search, hit Enter"
        />
      </FormContainer>
    </Box>
  );
}
