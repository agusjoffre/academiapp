import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

type Props = {
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "9xl";
};

export function Logo({ size }: Props) {
  return (
    <div className="flex items-center gap-2">
      <h1
        className={
          cn(
            size === "sm"
              ? "text-base"
              : size === "md"
              ? "text-lg"
              : size === "lg"
              ? "sm:text-2xl text-xl"
              : size === "xl"
              ? "sm:text-3xl text-2xl"
              : size === "xxl"
              ? "sm:text-6xl text-3xl"
              : size === "9xl"
              ? "sm:text-9xl text-5xl"
              : "text-base"
          ) + " font-bold"
        }
      >
        Studyo
      </h1>
    </div>
  );
}
