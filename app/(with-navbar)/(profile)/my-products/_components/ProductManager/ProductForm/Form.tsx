"use client";
import { Button, InputAdornment, MenuItem, Stack } from "@mui/material";
import Input from "../inputs/Input";
import { Box } from "@mui/material";
import useIsMobile from "../../useIsMobile";

import ChipSelect from "../inputs/ChipSelect";
import FileHandler from "../FileHandler/FileHandler";
import SizeSelect from "../inputs/SizeSelect";
import { ProductOptions } from "@/types/Product";
import CustomSelect from "../inputs/CustomSelect";

// This component contains the main form inputs for the product form.

type ProductFormProps = {
  isPending: boolean;
  isLoading: boolean;
  options: ProductOptions;
};

export default function ProductForm({ isPending, options }: ProductFormProps) {
  const isMobile = useIsMobile();

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
          />
          <Input
            key="Price"
            label="Price"
            props={{
              name: "price",
              required: true,
              placeholder: "160",
              type: "number",
              autoComplete: "price",
            }}
            disabled={isPending}
            mutations={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <ChipSelect
            options={options.colors}
            label="Colors"
            props={{ name: "color", required: true }}
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
              placeholder: "Nike",
              multiline: true,
              autoComplete: "description",
              minRows: isMobile ? 1 : 10,
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
        sx={{
          width: { xs: "200px", lg: "150px" },
          marginTop: { xs: "54.55px", lg: "0" },
          position: { lg: "absolute" },
          top: { lg: "25px" },
          right: { lg: "40px" },
          py: "25px",
          borderRadius: "5.58px",
          backgroundColor: "#FE645E",
          color: "white",
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
