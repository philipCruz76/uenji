import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {},
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/",
    },
  },
);

export const config = {
  matcher: [
    "/checkout/:path*",
    "/freelancer_onboarding/:path*",
    "/inbox/:path*",
    "/orders/:path*",
  ],
};
