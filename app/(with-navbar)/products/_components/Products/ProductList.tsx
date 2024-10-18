import LoadingPage from "@/components/Loading/LoadingPage";
import { FiltersType } from "@/types/types";
import ProductContainer from "@/components/Products/ProductContainer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { extractProductInfo, getProductsForCards } from "../../_lib/utils";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import NoProductsInfo from "@/app/(with-navbar)/_components/NoProductsInfo";
import ProductPreview from "@/components/Products/ProductPreview";

type ProductListProps = {
  setShoesCount: (num: number) => void;
  filters: FiltersType;
};

export default function ProductList({
  setShoesCount,
  filters,
}: ProductListProps) {
  const router = useRouter();

  const {
    data,
    status,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam }) => getProductsForCards(filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.meta.pagination.page;
      const pageCount = lastPage.meta.pagination.pageCount;
      return currentPage > pageCount || currentPage === pageCount
        ? null
        : currentPage + 1;
    },
  });

  const { ref, inView } = useInView({ rootMargin: "300px", threshold: 0 });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (data) {
      setShoesCount(data.pages[0].meta.pagination.total || 0);
    }
  }, [data, setShoesCount]);

  if (error) throw new Error("Something went wrong");

  if (status === "pending" || isLoading)
    return <LoadingPage backgroundColor="white" />;

  const noItemsFound = data.pages[0].meta.pagination.total === 0;

  return (
    <>
      <Grid container>
        {data.pages.map((page) => {
          const productInfo = extractProductInfo(page.data);
          return productInfo.map((product) => (
            <ProductContainer key={product.id}>
              <ProductPreview product={product} />
            </ProductContainer>
          ));
        })}
      </Grid>
      {noItemsFound && (
        <NoProductsInfo
          title="No results were found"
          subtitle="Try searching with different terms or explore more filter options."
          btnDescription="Search again"
          onBtnClick={() => router.push("/products")}
        />
      )}
      <Box ref={ref}>
        {isFetchingNextPage && (
          <LoadingPage backgroundColor="white" height="50vh" />
        )}
      </Box>
      {!hasNextPage && !noItemsFound && (
        <NoProductsInfo
          title="You have seen all the items"
          subtitle="Feel free to go back to the top to review."
          btnDescription="Go to top"
          onBtnClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}
    </>
  );
}
