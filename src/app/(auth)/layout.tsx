import { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";

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
    <div className="sm:py-7 flex sm:items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center flex flex-col gap-5 justify-center items-center">
          <Link className="cursor-pointer inline-block" href={"/"}>
            <Logo size="xxl" />
          </Link>
          <p className="text-sm text-muted-foreground sm:text-xl font-serif">
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
