import { BackResponse, SuccessResponse } from "@/types/types";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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
        console.log("user: ", data);
        if ("error" in data) throw new Error(data.error.message);
        data = data as SuccessResponse;
        return {
          id: data.user.id,
          name: data.user.username,
          email: data.user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       console.log("first user: ", user);
  //       if (user) {
  //         token.name = user.name;
  //         token.email = user.email;
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       console.log("Token: ", token);
  //       session.user = {
  //         name: token.name,
  //         email: token.email,
  //       };
  //       console.log("Session Logic: ", session);
  //       return session;
  //     },
  //   },
  //   secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
