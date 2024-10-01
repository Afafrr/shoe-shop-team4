"use server";
import { ContextType, ErrorResponse } from "@/types/types";
import {
  ImageUpload,
  ProductActionResponse,
  ProductResponse,
} from "@/types/Product";
import { FormDataToObject } from "../../../_lib/utils";
import { revalidatePath } from "next/cache";

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

  try {
    // Post request to backend. Upload images before posting the product.
    const uploadResponse = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    let result: ImageUpload = await uploadResponse.json();

    if ("error" in result) return result;

    const idImages = result.map((image) => image.id);

    // Format the formData to satisfy product PUT request.
    const productValues: Record<string, any> = FormDataToObject(formData);
    revalidatePath(`/products/${id}`);

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

    // POST request to edit product on backend
    let productResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
      {
        method: "PUT",
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
      }
    );
    let productResult: ProductResponse = await productResponse.json();

    if ("error" in result) return productResult as ErrorResponse;

    return { ...productResult, redirect: "" };
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
