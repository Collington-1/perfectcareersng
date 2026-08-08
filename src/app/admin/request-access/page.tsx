import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { RequestAccessForm } from "@/components/admin/request-access-form";

export default function RequestAccessPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-border">
        <Image src={siteConfig.logo.primary} alt={siteConfig.name} width={150} height={40} className="mx-auto h-9 w-auto" />
        <h1 className="mt-6 text-center font-heading text-xl font-bold text-foreground">Request Admin Access</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Tell us who you are — the main admin will review and approve your request.
        </p>

        <RequestAccessForm />

        <Link href="/admin/login" className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
