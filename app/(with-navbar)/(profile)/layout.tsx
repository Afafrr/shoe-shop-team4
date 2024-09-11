"use client";
import { ReactNode } from "react";
import ProfileAside from "./_components/ProfileAside";
import { Container } from "@mui/material";

type LayoutType = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutType) {
  return (
    <Container
      style={{
        display: "flex",
        margin: "0 0 50px 0",
        padding: "0",
        maxWidth: "none",
      }}
    >
      <ProfileAside breakpoint="lg" />
      {children}
    </Container>
  );
}
