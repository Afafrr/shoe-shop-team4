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
        rememberMe: { label: "Remember Me", type: "checkbox" },
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
          rememberMe: credentials?.rememberMe == "true" ? true : false,
          jwt: data.jwt,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.rememberMe = user.rememberMe;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.jwt = token.jwt as JWT;
        session.user.rememberMe = token.rememberMe as boolean;
      }
      if (token.rememberMe) {
        session.expires = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(); // 30 days
      } else {
        session.expires = new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(); // 1 day
      }
      return session;
    },
  },
};
