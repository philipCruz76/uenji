import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/gig") &&
      req.nextauth.token?.isSeller !== false
    )
      return NextResponse.redirect(new URL("/", req.nextUrl));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/gig/:path*", "/user/:path*", "/categories/:path*"],
};
