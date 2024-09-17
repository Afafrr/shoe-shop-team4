import { JWT } from "next-auth/jwt";
import { getData } from "./getData";
import { Options, SizeOptions } from "@/types/Product";
import { ResData } from "./getData";

export async function getOptions(token: JWT) {
  const colorOptions = getColors(token);
  const brandOptions = getBrands(token);
  const genderOptions = getGenders(token);
  const sizeOptions = getSizes(token);

  const [colors, brands, genders, sizes] = await Promise.all([
    colorOptions,
    brandOptions,
    genderOptions,
    sizeOptions,
  ]);

  return {
    colors,
    brands,
    genders,
    sizes,
  };
}

async function getColors(token: JWT) {
  let response: ResData<Options> = await getData<Options>("colors", token);
  if (!response.data) return null;
  return response.data.data.map((color) => ({
    value: color.id.toString(),
    label: color.attributes.name,
  }));
}

async function getBrands(token: JWT) {
  let response: ResData<Options> = await getData<Options>("brands", token);
  if (!response.data) return null;
  return response.data.data.map((brand) => ({
    value: brand.id.toString(),
    label: brand.attributes.name,
  }));
}

async function getGenders(token: JWT) {
  let response: ResData<Options> = await getData<Options>("genders", token);
  if (!response.data) return null;
  return response.data.data.map((gender) => ({
    value: gender.id.toString(),
    label: gender.attributes.name,
  }));
}

async function getSizes(token: JWT) {
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
