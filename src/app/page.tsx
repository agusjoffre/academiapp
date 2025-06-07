import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 sm:gap-10 md:gap-14 items-center justify-center p-4 sm:p-8 md:p-12 lg:p-20">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-3xl">
        <div className="w-full gap-6 sm:gap-8 text-center flex flex-col items-center justify-center">
          <div className="w-48 sm:w-64 md:w-72 lg:w-80 flex items-center justify-center">
            <Logo size="9xl" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-serif">
            Tu plataforma para organizar tu vida académica
          </p>
        </div>
        <Link
          href="/dashboard"
          className="w-full max-w-md sm:max-w-lg md:max-w-xl h-full flex items-center justify-center"
        >
          <Button
            className="w-full text-base sm:text-lg md:text-xl sm:font-semibold font-serif py-6 sm:py-7 md:py-9 text-center"
            variant={"secondary"}
          >
            Organiza tu vida academica
          </Button>
        </Link>
      </div>
    </main>
  );
}
