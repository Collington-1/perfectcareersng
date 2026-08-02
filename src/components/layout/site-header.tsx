import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { primaryNav } from "@/lib/nav-links";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <Container className="flex h-18 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${siteConfig.name} home`}>
          <Image
            src={siteConfig.logo.primary}
            alt={siteConfig.name}
            width={160}
            height={44}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <NavigationMenu className="hidden max-w-none flex-1 justify-center lg:flex" viewport={false}>
          <NavigationMenuList>
            {primaryNav.map((group) =>
              group.items && group.items.length > 0 ? (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger className="font-heading">
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-72 gap-1 p-2">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link href={item.href} className="flex-col items-start gap-0.5">
                              <span className="font-medium">{item.label}</span>
                              {item.description && (
                                <span className="text-xs text-muted-foreground">
                                  {item.description}
                                </span>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuLink asChild className="font-heading">
                    <Link href={group.href}>{group.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Button asChild variant="ghost">
            <Link href="/employers/post-a-job">For Employers</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Get Career Help</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm gap-0 p-0">
            <SheetHeader className="border-b border-border px-5 py-4">
              <SheetTitle asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src={siteConfig.logo.primary}
                    alt={siteConfig.name}
                    width={140}
                    height={38}
                    className="h-8 w-auto"
                  />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
              {primaryNav.map((group) => (
                <div key={group.label} className="mb-2">
                  <Link
                    href={group.href}
                    className="block rounded-lg px-3 py-2 font-heading text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    {group.label}
                  </Link>
                  {group.items && group.items.length > 0 && (
                    <div className="mt-0.5 flex flex-col gap-0.5 pl-3">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="flex flex-col gap-2 border-t border-border p-4">
              <Button asChild variant="secondary" className="w-full">
                <Link href="/contact">Get Career Help</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/employers/post-a-job">For Employers</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
