import LoadingPage from "@/components/Loading/LoadingPage";
import ProductCard from "@/components/Products/ProductCard";
import ProductsLayout from "@/components/Products/ProductsLayout";
import { getProducts } from "@/utils/api/products";
import { extractProductInfo } from "@/utils/products";
import { useQuery } from "@tanstack/react-query";

export default function ProductList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(["images", "gender"]),
  });

  if (isLoading) return <LoadingPage />;

  if (error) throw new Error("Something went wrong");

  const productInfo = extractProductInfo(data?.data);

  return (
    <ProductsLayout>
      {productInfo.map((product: any) => (
        <ProductCard
          key={product.id}
          imageUrl={product.imageUrl || ""}
          name={product.name}
          gender={product.gender}
          price={product.price}
        />
      ))}
    </ProductsLayout>
  );
}
