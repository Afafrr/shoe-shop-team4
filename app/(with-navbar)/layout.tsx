import { ReactNode, Suspense } from "react";
import NavBar from "./_components/navbar";
import Loading from "../loading";

type LayoutType = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutType) {
  return (
    <>
      <NavBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>;
    </>
  );
}
