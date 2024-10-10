"use client";

import { useCart } from "@/contexts/Cart";
import { useEffect } from "react";

export default function Page() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return <div>Success</div>;
}
