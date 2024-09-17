"use client";
import { Container, Button } from "@mui/material";
import { redirect } from "next/navigation";

export default function PageNone() {
  redirect("/");

  return <Container sx={{ margin: "0" }}></Container>;
}
