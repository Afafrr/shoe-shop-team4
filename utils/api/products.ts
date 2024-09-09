// import { ProductListResponse } from "@/types/Products";

type PopulateField =
  | "images"
  | "brand"
  | "categories"
  | "color"
  | "gender"
  | "sizes"
  | "userID";

export async function getProducts(
  fieldsToPopulate: PopulateField[] = [],
  token?: string
) {
  const populateFields = fieldsToPopulate.join(",");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token && fieldsToPopulate.includes("userID")) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products?populate=${populateFields}`,
    { headers }
  );
  const data = response.json();
  return data;
}
