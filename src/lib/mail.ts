import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

// Sends via Gmail SMTP using the business inbox (perfectcareersng@gmail.com)
// and a Google "App Password" — no separate email service needed.
// Set GMAIL_USER and GMAIL_APP_PASSWORD in the environment to activate.
function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const transport = getTransport();
  if (!transport) {
    console.warn("sendMail: GMAIL_USER/GMAIL_APP_PASSWORD not set — email not sent.", { to, subject });
    return { sent: false };
  }

  await transport.sendMail({
    from: `"${siteConfig.name}" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
  return { sent: true };
}

export function emailShell(title: string, bodyHtml: string, ctaLabel: string, ctaUrl: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
      <p style="font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase; color: #E65A24; font-weight: bold; margin: 0 0 12px;">${siteConfig.name}</p>
      <h1 style="font-size: 20px; margin: 0 0 16px; color: #6A2475;">${title}</h1>
      <div style="font-size: 14px; line-height: 1.6; color: #333;">${bodyHtml}</div>
      <a href="${ctaUrl}" style="display: inline-block; margin-top: 20px; background: #6A2475; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: bold;">${ctaLabel}</a>
      <p style="font-size: 12px; color: #999; margin-top: 24px;">If the button doesn't work, copy and paste this link:<br/>${ctaUrl}</p>
    </div>
  `;
}
