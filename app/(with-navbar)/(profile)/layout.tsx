import { ReactNode } from "react";
import ProfileAside from "./_components/ProfileAside";
import { Container } from "@mui/material";

type LayoutType = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutType) {
  return (
    <Container
      disableGutters
      style={{
        display: "flex",
        marginBottom: "50px",
        padding: "0",
        maxWidth: "none",
        margin: "0",
      }}
    >
      <ProfileAside />
      {children}
    </Container>
  );
}
