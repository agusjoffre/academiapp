"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./logout-button";
import { User } from "lucide-react";

type ProfileButtonProps = {
  user: {
    user_metadata?: { name?: string };
    email?: string;
  };
};

const ProfileButton = ({ user }: ProfileButtonProps) => {
  const displayName = user?.user_metadata?.name || user?.email || "Mi Perfil";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <User className="h-4 w-4" />
          Mi Perfil
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <Button variant={"ghost"}>Ir a mi perfil</Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="my-2">
          <LogoutButton
            variant="destructive"
            className="w-full cursor-pointer"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
