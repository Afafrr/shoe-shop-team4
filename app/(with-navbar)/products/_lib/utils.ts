import { AttributeResponse } from "@/types/Product";
import { ProductListResponseDataItem } from "@/types/Product";
import { FiltersType, SearchParamsType } from "@/types/types";
import { getProducts } from "@/utils/api/products";
import { getData } from "@/utils/getData";

export type FieldOption =
  | "brands"
  | "categories"
  | "colors"
  | "genders"
  | "sizes";

export async function getProductsForCards(
  filters: FiltersType = {},
  pageParam?: number
) {
  const products = await getProducts(["images", "gender"], filters, pageParam);

  return products;
}

export async function getFieldOptions(field: FieldOption) {
  const responseData = await getData<AttributeResponse>(`${field}`, null);
  const data = responseData.data;
  if (!data) throw new Error(`Error getting ${field}`);
  return data;
}

export function formatParamsToFilters(searchParams: SearchParamsType) {
  const filters: FiltersType = {};

  Object.keys(searchParams).forEach((key) => {
    if (Array.isArray(searchParams[key])) {
      filters[key] = searchParams[key];
    } else {
      filters[key] = [searchParams[key]!];
    }
  });

  return filters;
}

export function capitalizeWord(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function getDefaultValues(defaultFilters: FiltersType) {
  return {
    ...defaultFilters,
    price:
      defaultFilters.price && defaultFilters.price.length > 0
        ? parseInt(defaultFilters.price[0], 10)
        : 0,
  };
}

export function extractProductInfo(
  data: ProductListResponseDataItem[] | undefined
) {
  if (!data) return [];

  return data.map((product) => {
    const { id, attributes } = product;
    const { name, price, images, gender } = attributes;

    const imageUrl =
      images?.data?.length > 0 ? images.data[0].attributes.url : null;

    const genderName = gender?.data?.attributes?.name;

    return {
      id,
      name,
      price,
      gender: genderName,
      imageUrl,
    };
  });
}
