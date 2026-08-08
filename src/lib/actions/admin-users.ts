"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
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

  after(() =>
    sendMail({
      to: email,
      subject: `You've been added as an admin on ${siteConfig.name}`,
      html: emailShell(
        "You're in!",
        `<p>Hi ${parsed.data.name},</p><p>You've been given admin access to manage content on ${siteConfig.name}. Click below to set your password and log in. This link expires in 7 days.</p>`,
        "Set Your Password",
        `${siteConfig.siteUrl}/admin/reset-password?token=${token}`
      ),
    }).catch((error) => console.error("Failed to send admin invite email:", error))
  );

  revalidatePath("/admin/users");
  return { status: "success", message: `Invite sent to ${email}.` };
}

const requestSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Enter a valid email address."),
  message: z.string().optional(),
});

// Public — no auth. Anyone can ask; the super admin approves or denies.
export async function requestAdminAccess(_prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const parsed = requestSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message") || undefined,
  });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };

  const email = parsed.data.email.toLowerCase().trim();
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email } });
  if (existingAdmin) return { status: "error", message: "That email already has an admin account." };

  const existingRequest = await prisma.adminAccessRequest.findFirst({ where: { email, status: "PENDING" } });
  if (existingRequest) return { status: "success", message: "You already have a pending request — we'll be in touch." };

  await prisma.adminAccessRequest.create({
    data: { name: parsed.data.name, email, message: parsed.data.message },
  });

  after(() =>
    sendMail({
      to: siteConfig.contact.email,
      subject: `New admin access request — ${parsed.data.name}`,
      html: emailShell(
        "New Access Request",
        `<p><strong>${parsed.data.name}</strong> (${email}) has requested admin access to ${siteConfig.name}.</p>${parsed.data.message ? `<p>Message: ${parsed.data.message}</p>` : ""}<p>Review and approve or deny from your admin dashboard.</p>`,
        "Review Request",
        `${siteConfig.siteUrl}/admin/users`
      ),
    }).catch((error) => console.error("Failed to send access-request notification:", error))
  );

  return { status: "success", message: "Request sent! You'll get an email once it's reviewed." };
}

export async function approveAccessRequest(id: string) {
  await requireSuperAdmin();

  const request = await prisma.adminAccessRequest.findUnique({ where: { id } });
  if (!request || request.status !== "PENDING") return;

  const existing = await prisma.adminUser.findUnique({ where: { email: request.email } });
  if (!existing) {
    const token = crypto.randomBytes(32).toString("hex");
    const passwordHash = await bcrypt.hash(crypto.randomBytes(16).toString("hex"), 12);

    await prisma.adminUser.create({
      data: {
        name: request.name,
        email: request.email,
        passwordHash,
        role: "ADMIN",
        resetToken: token,
        resetTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    after(() =>
      sendMail({
        to: request.email,
        subject: `Your access to ${siteConfig.name} was approved`,
        html: emailShell(
          "You're approved!",
          `<p>Hi ${request.name},</p><p>Your request for admin access to ${siteConfig.name} was approved. Click below to set your password and log in. This link expires in 7 days.</p>`,
          "Set Your Password",
          `${siteConfig.siteUrl}/admin/reset-password?token=${token}`
        ),
      }).catch((error) => console.error("Failed to send approval email:", error))
    );
  }

  await prisma.adminAccessRequest.update({ where: { id }, data: { status: "APPROVED" } });
  revalidatePath("/admin/users");
}

export async function denyAccessRequest(id: string) {
  await requireSuperAdmin();
  await prisma.adminAccessRequest.update({ where: { id }, data: { status: "DENIED" } });
  revalidatePath("/admin/users");
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
