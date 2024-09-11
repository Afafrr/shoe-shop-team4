"use client";

import { useQuery } from "@tanstack/react-query";

export type PopulateField =
  | "images"
  | "brand"
  | "categories"
  | "sizes"
  | "gender"
  | "color";

export const fetchProductDetails = async (
  id: string,
  fieldsToPopulate: PopulateField[] = [],
  token?: string
) => {
  const populateFields = fieldsToPopulate.join(",");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}?populate=${populateFields}`,
    { headers }
  );
  const data = await response.json();
  return data.data;
};

export default function ProductDetails(
  id: string,
  fieldsToPopulate: PopulateField[] = [],
  token?: string
) {
  return useQuery({
    queryKey: ["productDetails", id, fieldsToPopulate],
    queryFn: () => fetchProductDetails(id, fieldsToPopulate, token),
  });
}
