import { ProductListResponseDataItem } from "@/types/Product";
import { Order, ProductFromOrder } from "@/types/types";
import { getProductsByIds } from "@/utils/api/products";
import Stripe from "stripe";

export async function getProductsForOrders(productsIds: string[]) {
  const products = await getProductsByIds(["images", "gender"], {
    productId: productsIds,
  });

  if (!products) {
    throw new Error("Error fetching the products");
  }
  return products;
}

export function getOrdersRelevantInfo(
  data: Stripe.Response<Stripe.ApiList<Stripe.PaymentIntent>> | null
): Order[] {
  const orders: Order[] = [];

  data?.data.forEach((order) => {
    let paymentType = "";
    if (order.payment_method && typeof order.payment_method !== "string") {
      paymentType = order.payment_method.type;
    }

    orders.push({
      id: order.id,
      created: order.created,
      status: order.status,
      paymentType,
      metadata: {
        ...order.metadata,
      },
      amount: order.amount,
    });
  });

  return orders;
}

export function getProductIdsFromOrder(order: Order): string[] {
  const products: ProductFromOrder[] = JSON.parse(
    order.metadata.products || ""
  );
  return products.map((product) => String(product.id));
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
