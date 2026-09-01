import { clerkMiddleware } from "@clerk/nextjs/server";
import createIntlProxy from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";
import { NextRequest } from "next/server";

const intlProxy = createIntlProxy(routing);

// near.tips has no protected routes today — every page is public, and
// sign-in exists only to attach a favorites list to an account. Clerk's
// job here is only to make a session available (via auth()/currentUser()
// in Server Components) alongside the existing locale routing. Nothing
// is gated.
export default clerkMiddleware((_auth, req: NextRequest) => {
  return intlProxy(req);
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
