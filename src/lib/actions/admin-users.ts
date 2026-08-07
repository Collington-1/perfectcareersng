"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMail, emailShell } from "@/lib/mail";
import { siteConfig } from "@/lib/site-config";

async function requireSuperAdmin() {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Only the main admin can manage other admins.");
  }
  return session;
}

const inviteSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Enter a valid email address."),
});

export type AdminFormState = { status: "idle" | "success" | "error"; message?: string };

export async function inviteAdmin(_prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  await requireSuperAdmin();

  const parsed = inviteSchema.safeParse({ name: formData.get("name"), email: formData.get("email") });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };

  const email = parsed.data.email.toLowerCase().trim();
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) return { status: "error", message: "That email already has an admin account." };

  const token = crypto.randomBytes(32).toString("hex");
  // Unusable placeholder password — they set their own via the emailed link.
  const passwordHash = await bcrypt.hash(crypto.randomBytes(16).toString("hex"), 12);

  await prisma.adminUser.create({
    data: {
      name: parsed.data.name,
      email,
      passwordHash,
      role: "ADMIN",
      resetToken: token,
      resetTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days to accept
    },
  });

  await sendMail({
    to: email,
    subject: `You've been added as an admin on ${siteConfig.name}`,
    html: emailShell(
      "You're in!",
      `<p>Hi ${parsed.data.name},</p><p>You've been given admin access to manage content on ${siteConfig.name}. Click below to set your password and log in. This link expires in 7 days.</p>`,
      "Set Your Password",
      `${siteConfig.siteUrl}/admin/reset-password?token=${token}`
    ),
  });

  revalidatePath("/admin/users");
  return { status: "success", message: `Invite sent to ${email}.` };
}

export async function removeAdmin(id: string) {
  const session = await requireSuperAdmin();
  if (session.user.id === id) throw new Error("You can't remove yourself.");

  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (target?.role === "SUPER_ADMIN") {
    const superAdminCount = await prisma.adminUser.count({ where: { role: "SUPER_ADMIN" } });
    if (superAdminCount <= 1) throw new Error("Can't remove the only main admin.");
  }

  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/users");
}
