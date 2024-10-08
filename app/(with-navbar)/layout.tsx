import { ReactNode, Suspense } from "react";
import NavBar from "./_components/navbar";
import Loading from "../loading";
import { ActivePathProvider } from "@/contexts/ActivePathProvider";

type LayoutType = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutType) {
  return (
    <ActivePathProvider>
      <NavBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>;
    </ActivePathProvider>
  );
}
