import { Link, SxProps } from "@mui/material";
import NextLink from "next/link";
import React, { ReactNode } from "react";

type SoftLinkProps = {
  href: string;
  sx?: SxProps;
  children: ReactNode;
};

export default function NextMuiLink({ href, sx, children }: SoftLinkProps) {
  return (
    <Link component={NextLink} href={href} sx={sx}>
      {children}
    </Link>
  );
}
