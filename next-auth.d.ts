// // types/next-auth.d.ts
import NextAuth from "next-auth";
import { Session } from "next-auth";
import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface User extends NextAuthUser {
    id: number; // Add any other custom properties here
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add your custom property here
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
