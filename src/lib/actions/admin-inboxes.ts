"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteSubscriber(id: string) {
  await prisma.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/admin/newsletter");
}

export async function deleteContactMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/contact-messages");
}

export async function toggleMessageRead(id: string, isRead: boolean) {
  await prisma.contactMessage.update({ where: { id }, data: { isRead } });
  revalidatePath("/admin/contact-messages");
}

export async function deleteWhatsAppLead(id: string) {
  await prisma.whatsAppLead.delete({ where: { id } });
  revalidatePath("/admin/whatsapp-leads");
}
