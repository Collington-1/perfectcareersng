import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

// Edge-safe config (no Prisma/Node APIs) — used directly by middleware.
// The Credentials provider (which needs Prisma) lives only in auth.ts,
// which runs in the Node runtime (API route, Server Components/Actions).
export const authConfig: NextAuthConfig = {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      const isLoginPage = pathname === "/admin/login";
      const isAdminRoute = pathname.startsWith("/admin");

      if (isAdminRoute && !isLoginPage && !isLoggedIn) return false;
      if (isLoginPage && isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", request.nextUrl));
      }
      return true;
    },
  },
};
