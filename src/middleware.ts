import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Uses the edge-safe config only — no Prisma import chain here, since
// middleware runs in the Edge Runtime, which can't load the Prisma client.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};
