"use client";

import { useRouter } from "next/navigation";
import SummaryInfo from "../../_components/SummaryInfo";
import ChartInfo from "./ChartInfo";
import useIsMobile from "../../(profile)/my-products/_components/useIsMobile";

export default function ProductsInCart() {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <>
      <ChartInfo />
      <SummaryInfo
        btnText={isMobile ? "Go to checkout" : "Checkout"}
        btnAction={() => router.push("/checkout")}
      />
    </>
  );
}
