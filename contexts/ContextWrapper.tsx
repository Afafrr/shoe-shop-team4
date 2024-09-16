import dynamic from "next/dynamic";

import { SessionAuthProvider } from "@/contexts/SessionAuthProvider";
const DynamicCartProvider = dynamic(
  () => import("@/contexts/Cart").then((module) => module.CartProvider),
  {
    ssr: false,
  }
);

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionAuthProvider>
      <DynamicCartProvider>{children}</DynamicCartProvider>
    </SessionAuthProvider>
  );
}
