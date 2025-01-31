import { Stack, Typography } from "@mui/material";
import Link from "next/link";

type FooterProps = {
  text?: string;
  anchor: string;
  href: string;
};

export default function AuthFooter({ text, anchor, href }: FooterProps) {
  return (
    <Stack mt={"16px"} sx={{ alignSelf: "center" }}>
      <Link
        href={href}
        style={{
          textDecoration: "none",
          fontWeight: 500,
          textAlign: "center",
          color: "#494949",
        }}
      >
        {text || ""}
        <Typography
          component="span"
          color={"#FE645E"}
          fontWeight={600}
          ml={"5px"}
        >
          {anchor}
        </Typography>
      </Link>
    </Stack>
  );
}
