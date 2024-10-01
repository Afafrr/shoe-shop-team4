"use server";
import { ContextType, ErrorResponse } from "@/types/types";
import {
  ImageUpload,
  ProductActionResponse,
  ProductResponse,
} from "@/types/Product";
import { FormDataToObject } from "../_lib/utils";
import { revalidatePath } from "next/cache";

export async function addProductAction(
  formData: FormData,
  context: ContextType
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

  const jwt = session.user.jwt;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  //Required body on backend
  formData.append("path", "");
  formData.append("refId", "");
  formData.append("ref", "");
  formData.append("field", "");

  // Post request to backend. Upload images before updating the product.
  try {
    const uploadResponse = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    let result: ImageUpload = await uploadResponse.json();

    if ("error" in result) return result;

    const idImages = result.map((image) => image.id);

    // Format the formData to satisfy product POST request.
    const productValues: Record<string, any> = FormDataToObject(formData);

    const {
      name,
      price,
      categories,
      color,
      gender,
      brand,
      description,
      sizes,
    } = productValues;

    let productResponse = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        data: {
          name,
          images: idImages,
          description,
          brand,
          categories,
          color,
          gender,
          sizes,
          price,
          userID: session.user.id,
          teamName: "team-4",
        },
      }),
    });
    let productResult: ProductResponse = await productResponse.json();

    if ("error" in productResult) return productResult as ErrorResponse;
    revalidatePath(`/my-products`);

    return { ...productResult, redirect: "/my-products" };
  } catch (error) {
    return {
      data: {},
      error: {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
    };
  }
}
