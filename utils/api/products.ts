import { ProductListResponse } from "@/types/Product";
import { FiltersType } from "@/types/types";
import qs from "qs";
import { getData } from "../getData";
import { JWT } from "next-auth/jwt";

type PopulateField =
  | "images"
  | "brand"
  | "categories"
  | "color"
  | "gender"
  | "sizes"
  | "userID";

const pageSize = 24;

export async function getProducts(
  fieldsToPopulate: PopulateField[] = [],
  filters: FiltersType = {},
  page: number = 1,
  token?: JWT | null | undefined
): Promise<ProductListResponse> {
  const populateFields = fieldsToPopulate.join(",");

  const pagination = `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  const query = createFiltersQuery(filters);

  const responseData = await getData<ProductListResponse>(
    `products?populate=${populateFields}&${pagination}&${query}`,
    token
  );
  const data = responseData.data;

  if (!data) {
    throw new Error("Error fetching the products");
  }

  return data;
}

export async function getProductsByIds(
  fieldsToPopulate: PopulateField[] = [],
  filters: FiltersType = {},
  token?: JWT | null | undefined
): Promise<ProductListResponse> {
  const populateFields = fieldsToPopulate.join(",");

  const query = createFiltersQuery(filters);

  const responseData = await getData<ProductListResponse>(
    `products?populate=${populateFields}&${query}`,
    token
  );
  const data = responseData.data;

  if (!data) {
    throw new Error("Error fetching the products");
  }

  return data;
}

function createFiltersQuery(filters: FiltersType) {
  const dynamicFilters = Object.entries(filters).reduce(
    (acc, [key, values]) => {
      switch (key) {
        case "search":
          acc["name"] = {
            $containsi: values,
          };
          break;
        case "sizes":
          acc[key] = {
            value: {
              $containsi: values,
            },
          };
          break;
        case "price":
          acc["price"] = {
            $lt: values,
          };
          break;
        case "productId":
          acc["id"] = {
            $in: values,
          };
          break;
        default:
          if (values && values.length > 0) {
            acc[key] = {
              name: {
                $in: values,
              },
            };
          }
          break;
      }
      return acc;
    },
    {} as Record<string, any>
  );
  return qs.stringify(
    {
      filters: {
        ...dynamicFilters,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
