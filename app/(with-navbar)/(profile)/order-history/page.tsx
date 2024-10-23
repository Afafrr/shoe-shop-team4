import { Order, ProductFromOrder, SearchParamsType } from "@/types/types";
import OrderHistoryPage from "./_components/OrderHistoryPage";
import { getUserOrders } from "./actions";
import {
  getOrdersRelevantInfo,
  getProductIdsFromOrder,
  getProductsForOrders,
} from "./_lib/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const queryClient = new QueryClient();
  const { data } = await getUserOrders();

  const orderId = Array.isArray(searchParams.orderId)
    ? searchParams.orderId[0]
    : searchParams.orderId;

  const orders: Order[] = data ? getOrdersRelevantInfo(data) : [];

  if (orderId) {
    const order = orders.find((order) => order.id === orderId);

    if (order) {
      const productsIds = getProductIdsFromOrder(order);

      await queryClient.prefetchQuery({
        queryKey: ["productsForCard", productsIds],
        queryFn: () => getProductsForOrders(productsIds),
      });
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderHistoryPage orders={orders} orderIdOpened={orderId} />
    </HydrationBoundary>
  );
}
