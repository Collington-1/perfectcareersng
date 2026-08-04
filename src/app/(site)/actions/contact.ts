"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message should be at least 10 characters."),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactMessage(_prevState: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });
    return { status: "success", message: "Message received! We'll get back to you within 24 hours." };
  } catch {
    return { status: "error", message: "Something went wrong. Please try WhatsApp instead." };
  }
}
