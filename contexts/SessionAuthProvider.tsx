"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: ReactNode;
};

export const SessionAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
