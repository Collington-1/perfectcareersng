"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMail, emailShell } from "@/lib/mail";
import { siteConfig } from "@/lib/site-config";

export async function signOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

export type ForgotPasswordState = { status: "idle" | "success" | "error"; message?: string };

export async function requestPasswordReset(_prev: ForgotPasswordState, formData: FormData): Promise<ForgotPasswordState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  if (!email) return { status: "error", message: "Enter your email address." };

  const user = await prisma.adminUser.findUnique({ where: { email } });
  // Same message whether or not the account exists, so we never reveal
  // which email addresses have admin access.
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000) },
    });

    // Gmail SMTP takes 8-16s — send after the response goes out so the
    // user isn't stuck waiting, and so slow SMTP can't trip a function timeout.
    after(() =>
      sendMail({
        to: user.email,
        subject: `Reset your ${siteConfig.name} admin password`,
        html: emailShell(
          "Reset your password",
          `<p>Hi ${user.name},</p><p>We received a request to reset your admin password. This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>`,
          "Reset Password",
          `${siteConfig.siteUrl}/admin/reset-password?token=${token}`
        ),
      }).catch((error) => console.error("Failed to send password reset email:", error))
    );
  }

  return { status: "success", message: "If that email has an admin account, a reset link has been sent to it." };
}

export type ResetPasswordState = { status: "idle" | "error"; message?: string };

export async function resetPassword(token: string, _prev: ResetPasswordState, formData: FormData): Promise<ResetPasswordState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password.length < 8) return { status: "error", message: "Password must be at least 8 characters." };
  if (password !== confirmPassword) return { status: "error", message: "Passwords don't match." };

  const user = await prisma.adminUser.findUnique({ where: { resetToken: token } });
  if (!user || !user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
    return { status: "error", message: "This reset link is invalid or has expired. Request a new one." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { passwordHash, resetToken: null, resetTokenExpiresAt: null },
  });

  redirect("/admin/login?reset=1");
}
