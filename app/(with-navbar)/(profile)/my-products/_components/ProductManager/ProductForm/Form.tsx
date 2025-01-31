"use client";
import { Button, InputAdornment, Stack } from "@mui/material";
import Input from "../inputs/Input";
import { Box } from "@mui/material";
import useIsMobile from "../../useIsMobile";
import { useState } from "react";
import ChipSelect from "../inputs/ChipSelect";
import FileHandler from "../FileHandler/FileHandler";
import SizeSelect from "../inputs/SizeSelect";
import CustomSelect from "../inputs/CustomSelect";
import { getOptions } from "@/utils/getOptions";
import { useQuery } from "@tanstack/react-query";
import { JWT } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import LoadingPage from "@/components/Loading/LoadingPage";
import AiDescriptionButton from "../AiDescriptionButton";

// This component contains the main form inputs for the product form.

type ProductFormProps = {
  isPending: boolean;
};

export default function ProductForm({ isPending }: ProductFormProps) {
  const isMobile = useIsMobile();
  const { data: session } = useSession();
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  const { data: options, error: queryError } = useQuery({
    queryKey: ["options"],
    queryFn: () => getOptions(session?.user.jwt as JWT),
  });

  if (!options) return <LoadingPage width="100%" height="800px" />;

  return (
    <>
      <Stack
        direction={{ lg: "row", xs: "column" }}
        spacing={{ lg: 11.5, xs: 10 }}
        sx={{
          alignItems: { xs: "center", lg: "flex-start" },
          width: "100%",
        }}
      >
        <Stack
          id="default-form"
          spacing={{ xs: "24px", lg: "15px" }}
          sx={{ width: { xs: "100%", lg: "40%" }, minWidth: { lg: "300px" } }}
        >
          <Input
            key="Product name"
            label="Product name"
            props={{
              name: "name",
              required: true,
              placeholder: "Nike Air Max 90",
              type: "text",
              autoComplete: "name",
            }}
            disabled={isPending}
            isControlled
          />
          <Input
            key="Price"
            label="Price"
            props={{
              name: "price",
              required: true,
              placeholder: "1600",
              type: "number",
              autoComplete: "price",
            }}
            disabled={isPending}
            mutations={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            inputProps={{ min: 1 }}
          />
          <ChipSelect
            options={options.categories}
            name="categories"
            label="Categories"
            props={{
              name: "Category",
              placeholder: "Select categories...",
              required: true,
            }}
          />
          <ChipSelect
            options={options.colors}
            name="color"
            label="Colors"
            props={{
              name: "color",
              required: true,
              placeholder: "Select colors...",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <CustomSelect
              label="Gender"
              name="gender"
              sizes={{ width: "48%" }}
              options={options.genders}
            />
            <CustomSelect
              label="Brand"
              name="brand"
              sizes={{ width: "48%" }}
              options={options.brands}
            />
          </Box>
          <Input
            key="description"
            label="Description"
            props={{
              name: "description",
              required: true,
              placeholder: isGeneratingDesc
                ? "Generating Description..."
                : "Best snickers in the market!",
              multiline: true,
              autoComplete: "description",
              minRows: isMobile ? 1 : 10,
            }}
            isControlled
            mutations={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    position: "absolute",
                    bottom: 24,
                    right: 6,
                  }}
                >
                  <AiDescriptionButton
                    setIsGeneratingDesc={setIsGeneratingDesc}
                    isGeneratingDesc={isGeneratingDesc}
                  />
                </InputAdornment>
              ),
            }}
          />
          <SizeSelect
            props={{ name: "Sizes", required: true }}
            options={options.sizes}
          />
        </Stack>
        <Box sx={{ marginRight: "45px" }}>
          <FileHandler label="Product images" required />
        </Box>
      </Stack>
      <Button
        type="submit"
        disabled={isPending}
        variant="contained"
        sx={{
          width: { xs: "200px", lg: "150px" },
          marginTop: { xs: "54.55px", lg: "0" },
          position: { lg: "absolute" },
          top: { lg: "25px" },
          right: { lg: "40px" },
          py: "25px",
          borderRadius: "5.58px",
          height: { xs: "60px", lg: "34px" },
          fontWeight: 500,
          textTransform: "none",
          alignSelf: { xs: "center", lg: "unset" },
        }}
      >
        Save
      </Button>
    </>
  );
}
