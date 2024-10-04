import dynamic from "next/dynamic";

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
  return <DynamicCartProvider>{children}</DynamicCartProvider>;
}
