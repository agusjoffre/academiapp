"use server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/actions/auth/session-actions";
import { ThemeToggle } from "./theme-toggle";
import ProfileButton from "./profile-button";
import { LayoutDashboard, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

export default async function Header() {
  const user = await getSession();

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-10 py-2 sm:py-3 border-b bg-background">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Logo size="xl" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-2">
          {!user ? (
            <Link href="/login">
              <Button>Iniciar Sesion</Button>
            </Link>
          ) : (
            <>
              <Button asChild variant="secondary">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
              <ProfileButton user={user} />
            </>
          )}
        </div>
        <ThemeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center gap-4">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col items-center gap-6 py-28 px-7">
            <SheetTitle className="text-xl font-bold mb-6">Menú</SheetTitle>
            <div className="flex flex-col gap-4 w-full">
              {!user ? (
                <Link href="/login" className="w-full">
                  <Button className="w-full">Iniciar Sesion</Button>
                </Link>
              ) : (
                <>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                  <ProfileButton user={user} />
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
