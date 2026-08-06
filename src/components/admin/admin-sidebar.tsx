"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { adminNav } from "@/lib/admin-nav";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/lib/actions/admin-auth";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {adminNav.map((item) => {
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserFooter({ userName }: { userName: string }) {
  return (
    <div className="border-t border-border p-3">
      <div className="flex items-center justify-between gap-2 rounded-lg px-3 py-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{userName}</p>
          <p className="text-xs text-muted-foreground">Administrator</p>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            aria-label="Sign out"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-destructive"
          >
            <LogOut className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: permanent sidebar */}
      <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-border bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Image src={siteConfig.logo.primary} alt={siteConfig.name} width={130} height={34} className="h-8 w-auto" />
        </div>
        <NavLinks pathname={pathname} />
        <UserFooter userName={userName} />
      </aside>

      {/* Mobile/tablet: top bar with a slide-in drawer */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-white px-4 lg:hidden">
        <Link href="/admin" className="flex items-center">
          <Image src={siteConfig.logo.primary} alt={siteConfig.name} width={120} height={32} className="h-7 w-auto" />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open admin menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 gap-0 p-0">
            <SheetTitle className="sr-only">Admin navigation</SheetTitle>
            <div className="flex h-16 items-center border-b border-border px-5">
              <Image src={siteConfig.logo.primary} alt={siteConfig.name} width={130} height={34} className="h-8 w-auto" />
            </div>
            <NavLinks pathname={pathname} />
            <UserFooter userName={userName} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
