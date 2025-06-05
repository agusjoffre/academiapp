"use server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/actions/auth/session-actions";
import { ThemeToggle } from "./theme-toggle";
import ProfileButton from "./profile-button";
import { LayoutDashboard } from "lucide-react";

export default async function Header() {
  const user = await getSession();

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b bg-background">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-xl font-bold">AcademiApp</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
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
    </header>
  );
}
