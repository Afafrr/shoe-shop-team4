"use server";
import { ContextType, ErrorResponse } from "@/types/types";
import {
  ImageUpload,
  ProductActionResponse,
  ProductResponse,
  SuccessfulImageUpload,
  SuccessfulProductAdd,
} from "@/types/Product";

export async function editProductAction(
  formData: FormData,
  context: ContextType,
  id: string
): Promise<ProductActionResponse> {
  // If no session return
  const { session } = context;
  if (!session || !session.user.jwt)
    return {
      data: {},
      error: {
        message: "Unauthorized",
      },
    };

  //Required body on backend
  formData.append("path", "");
  formData.append("refId", "");
  formData.append("ref", "");
  formData.append("field", "");

  // Post request to backend. Upload images before posting the product.
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user.jwt}`,
    },
    body: formData,
  });
  let result: ImageUpload = await response.json();
  if ("error" in result) return result;
  result = result as SuccessfulImageUpload;
  const idImages = result.map((image) => image.id);

  // Format the formData to satisfy product POST request.
  const productValues: Record<string, any> = {};
  formData.forEach((value, key) => {
    try {
      productValues[key] = JSON.parse(value as string);
    } catch {
      productValues[key] = value;
    }
  });

  const { name, price, color, gender, brand, description, sizes } =
    productValues;

  // POST request to edit product on backend
  let productResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.jwt}`,
      },
      body: JSON.stringify({
        data: {
          name,
          images: idImages,
          description,
          brand,
          categories: [5],
          color,
          gender,
          sizes,
          price,
          userID: session.user.id,
          teamName: "team-4",
        },
      }),
    }
  );
  let productResult: ProductResponse = await productResponse.json();

  if ("error" in result) return productResult as ErrorResponse;
  productResult = productResult as SuccessfulProductAdd;
  return { ...productResult, redirect: "/settings" };
}
