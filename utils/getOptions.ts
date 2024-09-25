import { JWT } from "next-auth/jwt";
import { getData } from "./getData";
import { Options, SizeOptions } from "@/types/Product";
import { ResData } from "./getData";

export async function getOptions(token: JWT) {
  const colorOptions = getColors(token);
  const categoryOptions = getCategories(token);
  const brandOptions = getBrands(token);
  const genderOptions = getGenders(token);
  const sizeOptions = getSizes(token);

  const [colors, categories, brands, genders, sizes] = await Promise.all([
    colorOptions,
    categoryOptions,
    brandOptions,
    genderOptions,
    sizeOptions,
  ]);

  return {
    colors,
    categories,
    brands,
    genders,
    sizes,
  };
}

export async function getColors(token: JWT) {
  let response: ResData<Options> = await getData<Options>("colors", token);
  if (!response.data) return null;
  return response.data.data.map((color) => ({
    value: color.id.toString(),
    label: color.attributes.name,
  }));
}

export async function getCategories(token: JWT) {
  let response: ResData<Options> = await getData<Options>("categories", token);
  if (!response.data) return null;
  return response.data.data.map((category) => ({
    value: category.id.toString(),
    label: category.attributes.name,
  }));
}

export async function getBrands(token: JWT) {
  let response: ResData<Options> = await getData<Options>("brands", token);
  if (!response.data) return null;
  return response.data.data.map((brand) => ({
    value: brand.id.toString(),
    label: brand.attributes.name,
  }));
}

export async function getGenders(token: JWT) {
  let response: ResData<Options> = await getData<Options>("genders", token);
  if (!response.data) return null;
  return response.data.data.map((gender) => ({
    value: gender.id.toString(),
    label: gender.attributes.name,
  }));
}

export async function getSizes(token: JWT) {
  let response: ResData<SizeOptions> = await getData<SizeOptions>(
    "sizes",
    token
  );
  if (!response.data) return null;
  return response.data.data.map((size) => ({
    value: size.id.toString(),
    label: size.attributes.value,
  }));
}
