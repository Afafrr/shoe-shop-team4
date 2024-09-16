// // types/next-auth.d.ts
import NextAuth from "next-auth";
import { Session } from "next-auth";
import { User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends NextAuthUser {
    id: number;
    jwt: JWT | undefined;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      jwt: JWT | null;
    };
  }
}
