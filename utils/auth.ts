import { BackResponse, SuccessResponse } from "@/types/types";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/local`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identifier: credentials?.email,
              password: credentials?.password,
            }),
          }
        );
        let data: BackResponse = await response.json();
        if ("error" in data) throw new Error(data.error.message);
        data = data as SuccessResponse;
        return {
          id: data.user.id,
          name: data.user.username,
          email: data.user.email,
          jwt: data.jwt,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/products",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.jwt = token.jwt as JWT;
      }
      return session;
    },
  },
};
