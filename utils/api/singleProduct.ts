import { useQuery } from "@tanstack/react-query";
import { ProductResponse } from "@/types/singleProduct";

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
): Promise<ProductResponse> => {
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
  return data;
};

export default function ProductDetails(
  id: string,
  fieldsToPopulate: PopulateField[] = [],

) {
  return useQuery<ProductResponse>({
    queryKey: ["productDetails", id, fieldsToPopulate],
    queryFn: () => fetchProductDetails(id, fieldsToPopulate),
  });
}
