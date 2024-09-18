import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PopulateField } from "@/utils/api/singleProduct";
import { fetchProductDetails } from "@/utils/api/singleProduct";
import SingleProductPage from "./_components/SingleProductPage";

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  const fieldsToPopulate: PopulateField[] = [
    "images",
    "brand",
    "categories",
    "sizes",
    "gender",
    "color",
  ];

  await queryClient.prefetchQuery({
    queryKey: ["productDetails", params.id, fieldsToPopulate],
    queryFn: () => fetchProductDetails(params.id, fieldsToPopulate),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleProductPage
        productId={params.id}
        fieldsToPopulate={fieldsToPopulate}
      />
    </HydrationBoundary>
  );
}
