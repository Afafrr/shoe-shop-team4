import { ProductListResponseDataItem } from "@/types/Product";
import { getProductsByIds } from "@/utils/api/products";

export async function getProductsForOrders(productsIds: string[]) {
  const products = await getProductsByIds(["images", "gender"], {
    productId: productsIds,
  });

  if (!products) {
    throw new Error("Error fetching the products");
  }
  return products;
}

export function getProductInfo(product: ProductListResponseDataItem) {
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
}
