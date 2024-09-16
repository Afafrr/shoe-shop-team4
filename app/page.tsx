"use client";

import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import LoadingPage from "@/components/Loading/LoadingPage";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <main>
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => router.push("/auth/sign-in")}>Sign In</button>
      )}
    </main>
  );
}
