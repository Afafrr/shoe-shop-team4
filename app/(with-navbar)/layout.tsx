import { ReactNode, Suspense } from "react";
import NavBar from "./_components/navbar";
import Loading from "../loading";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getData } from "@/utils/getData";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";

type LayoutType = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutType) {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    queryKey: ["userData"],
    queryFn: () => getData("users/me?populate=avatar", session?.user.jwt),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavBar />
      </HydrationBoundary>
      <Suspense fallback={<Loading />}>{children}</Suspense>;
    </>
  );
}
