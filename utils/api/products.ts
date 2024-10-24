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

const pageSize = 16;

export async function getProducts(
  fieldsToPopulate: PopulateField[] = [],
  filters: FiltersType = {},
  page: number = 1,
  token?: JWT | null | undefined
): Promise<ProductListResponse> {
  const populateFields = fieldsToPopulate.join(",");

  const pagination = `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  const sort = `sort=createdAt:desc`;

  const query = createFiltersQueryWithTeam(filters);

  const responseData = await getData<ProductListResponse>(
    `products?populate=${populateFields}&${pagination}&${query}&${sort}`,
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

function createFiltersQueryWithTeam(filters: FiltersType) {
  const query = createFiltersQuery(filters);

  const parsedQuery = qs.parse(query);

  const filtersQuery =
    parsedQuery.filters && typeof parsedQuery.filters === "object"
      ? (parsedQuery.filters as qs.ParsedQs)
      : {};

  filtersQuery["teamName"] = { $eq: "team-4" };

  parsedQuery.filters = filtersQuery;

  return qs.stringify(parsedQuery, { encodeValuesOnly: true });
}
