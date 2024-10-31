import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PopulateField, fetchProductDetails } from "@/utils/api/singleProduct";
import SingleProductPage from "./_components/SingleProductPage";
import { notFound } from "next/navigation";
import { ProductResponse } from "@/types/singleProduct";

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

  try {
    await queryClient.prefetchQuery({
      queryKey: ["productDetails", params.id, fieldsToPopulate],
      queryFn: () => fetchProductDetails(params.id, fieldsToPopulate),
    });

    const data = queryClient.getQueryData<ProductResponse>([
      "productDetails",
      params.id,
      fieldsToPopulate,
    ]);

    if (!data || !data.data) {
      notFound();
    }

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SingleProductPage
          productId={params.id}
          fieldsToPopulate={fieldsToPopulate}
        />
      </HydrationBoundary>
    );
  } catch (error) {
    notFound();
  }
}
