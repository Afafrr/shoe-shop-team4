import { ReactNode } from "react";
import { Container } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getOptions } from "@/utils/getOptions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { JWT } from "next-auth/jwt";

type LayoutType = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutType) {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["options"],
    queryFn: () => getOptions(session?.user.jwt as JWT),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container
        disableGutters
        style={{
          display: "flex",
          margin: "0 0 50px 0",
          padding: "0",
          maxWidth: "none",
        }}
      >
        {children}
      </Container>
    </HydrationBoundary>
  );
}
