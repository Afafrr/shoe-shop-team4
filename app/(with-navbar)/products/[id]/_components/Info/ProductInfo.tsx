"use client";

import ProductTitle from "./ProductTitle";

type ProductInfoProps = {
  name: string;
  price: number;
  subtitle?: string;
};

export default function ProductInfo({
  name,
  price,
  subtitle,
}: ProductInfoProps) {
  return (
    <div>
      <ProductTitle name={name} price={price} />
      <p>{subtitle}</p>
    </div>
  );
}
