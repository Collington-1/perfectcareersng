import Image from "next/image";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function loginAction(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      const { redirect } = await import("next/navigation");
      redirect("/admin/login?error=1");
    }
    throw error;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-border">
        <Image src={siteConfig.logo.primary} alt={siteConfig.name} width={150} height={40} className="mx-auto h-9 w-auto" />
        <h1 className="mt-6 text-center font-heading text-xl font-bold text-foreground">Admin Sign In</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Manage jobs, scholarships, grants and blog content.</p>

        {error && (
          <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
            Invalid email or password.
          </p>
        )}

        <form action={loginAction} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@perfectcareersng.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required autoComplete="current-password" />
          </div>
          <Button type="submit" size="lg" className="mt-2 w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
