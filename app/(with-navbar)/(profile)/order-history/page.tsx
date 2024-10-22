import { Order } from "@/types/types";
import OrderHistoryPage from "./_components/OrderHistoryPage";
import { getUserOrders } from "./actions";

export default async function Page() {
  const { data } = await getUserOrders();
  let orders: Order[] = [];

  if (data) {
    data.data.forEach((order) => {
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
  }

  return <OrderHistoryPage orders={orders} />;
}
