import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication pages for Academiapp",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            <Link className="cursor-pointer" href={"/"}>
              Academiapp
            </Link>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Tu plataforma para organizar tu vida académica
          </p>
        </div>
        <div className="mt-8 rounded-lg border bg-card p-4 shadow-sm sm:p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
