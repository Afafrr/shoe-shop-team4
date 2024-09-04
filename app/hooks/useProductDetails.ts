"use client";

import { useQuery } from "@tanstack/react-query";

const fetchProductDetails = async (id: string) => {
  const response = await fetch(
    `https://shoes-shop-strapi.herokuapp.com/api/products/${id}?populate=images,brand,categories,sizes,gender,color`
  );
  const data = await response.json();
  return data.data;
};

export default function useProductDetails(id: string) {
  return useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => fetchProductDetails(id),
  });
}
