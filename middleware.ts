import { withAuth } from "next-auth/middleware";
import { availableLocaleCodes, defaultLocale } from "./next.locales.mjs";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { rateLimit } from "./lib/rate-limit";

const privatePages = [
  "/checkout/:path*",
  "/freelancer_onboarding/:path*",
  "/inbox/:path*",
  "/orders/:path*",
];
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: availableLocaleCodes,

  // Used when no locale matches
  defaultLocale: defaultLocale.code,

  // Always use a Locale as a prefix for routing
  localePrefix: "always",

  // We already have our own way of providing alternate links
  // generated on `next.dynamic.mjs`
  alternateLinks: false,
});
const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/",
    },
  },
);

export default async function middleware(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0];

  const { remaining } = await rateLimit().limit(ip);
  if (remaining < 1) {
    return new Response("Rate limit exceeded", { status: 429 });
  }
  const privatePathnameRegex = RegExp(
    `^(/(${availableLocaleCodes.join("|")}))?(${privatePages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  if (!isPrivatePage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
