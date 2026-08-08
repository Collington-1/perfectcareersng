import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

// Edge-safe config (no Prisma/Node APIs) — used directly by middleware.
// The Credentials provider (which needs Prisma) lives only in auth.ts,
// which runs in the Node runtime (API route, Server Components/Actions).
// Admin pages a signed-out visitor must be able to reach.
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/forgot-password", "/admin/reset-password", "/admin/request-access"];

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      const isPublicAdminPage = PUBLIC_ADMIN_PATHS.some((p) => pathname === p);
      const isAdminRoute = pathname.startsWith("/admin");

      if (isAdminRoute && !isPublicAdminPage && !isLoggedIn) return false;
      if (pathname === "/admin/login" && isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", request.nextUrl));
      }
      return true;
    },
  },
};
