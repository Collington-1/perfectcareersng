import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { ResetPasswordForm } from "@/components/admin/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-border">
        <Image src={siteConfig.logo.primary} alt={siteConfig.name} width={150} height={40} className="mx-auto h-9 w-auto" />
        <h1 className="mt-6 text-center font-heading text-xl font-bold text-foreground">Set a New Password</h1>

        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <p className="mt-6 rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
            Missing reset token. Use the link from your email.
          </p>
        )}
      </div>
    </div>
  );
}
