"use client";
import { Button, InputAdornment, MenuItem, Stack } from "@mui/material";
import Input from "../Input";
import { Box } from "@mui/material";
import useIsMobile from "../useIsMobile";

import productData from "../../data/productData";
import ChipSelect from "../ChipSelect";
import FileHandler from "../FileHandler/FileHandler";
import SizeSelect from "../SizeSelect";

type ProductFormProps = {
  isPending: boolean;
};

export default function ProductForm({ isPending }: ProductFormProps) {
  const isMobile = useIsMobile();

  return (
    <>
      <Stack
        direction={{ lg: "row", xs: "column" }}
        spacing={{ lg: 15, xs: 10 }}
        sx={{
          alignItems: { xs: "center", lg: "flex-start" },
          width: "100%",
        }}
      >
        <Stack
          id="default-form"
          spacing={{ xs: "24px", lg: "15px" }}
          sx={{ width: { xs: "100%", lg: "40%" } }}
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
            options={productData.colors}
            label="Colors"
            props={{ name: "color", required: true }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              key="Gender"
              label="Gender"
              props={{
                name: "gender",
                required: true,
                placeholder: "Male",
                type: "text",
                select: true,
                autoComplete: "gender",
              }}
              size="48%"
            >
              {productData.genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Input>
            <Input
              key="Brand"
              label="Brand"
              props={{
                name: "brand",
                required: true,
                placeholder: "Nike",
                type: "text",
                select: true,
                autoComplete: "brand",
              }}
              size="48%"
            >
              {productData.brands.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Input>
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
              rows: isMobile ? 1 : 10,
            }}
          />
          <SizeSelect props={{ name: "Sizes", required: true }} />
        </Stack>
        <Box sx={{ marginRight: "45px" }}>
          <FileHandler name="image" fieldName="Product images" required />
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
