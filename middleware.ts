import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/products",
  },
});

export const config = {
  matcher: [
    "/settings/:path*",
    "/my-products/:path*",
    "/chart/:path*",
    "/my-wishlist/:path*",
    "/recently-viewed/:path*",
  ],
};
