import { ReactNode } from "react";
import NavBar from "./_components/navbar";

type LayoutType = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutType) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
