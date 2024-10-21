import { getMyProducts } from "./action";
import MyProductsClient from "./_components/MyProductsClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["my-products"],
    queryFn: getMyProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyProductsClient />
    </HydrationBoundary>
  );
}
