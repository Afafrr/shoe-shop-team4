import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchParamsType } from "@/types/types";
import {
  formatParamsToFilters,
  getFieldOptions,
  getProductsForCards,
} from "./_lib/utils";
import ProductsPage from "./_components/Products/ProductsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const queryClient = new QueryClient();

  const filters = formatParamsToFilters(searchParams);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["products", searchParams],
      queryFn: () => getProductsForCards(filters),
    }),
    queryClient.prefetchQuery({
      queryKey: ["genders"],
      queryFn: () => getFieldOptions("genders"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => getFieldOptions("categories"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["brands"],
      queryFn: () => getFieldOptions("brands"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["colors"],
      queryFn: () => getFieldOptions("colors"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["sizes"],
      queryFn: () => getFieldOptions("sizes"),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPage searchParams={filters} />
    </HydrationBoundary>
  );
}
