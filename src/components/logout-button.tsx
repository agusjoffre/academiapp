"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signOutUser } from "@/lib/actions/auth/sign-out-actions";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
};

const LogoutButton = ({
  variant = "default",
  className,
}: LogoutButtonProps) => {
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      const response = await signOutUser();
      if (response.success) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        onClick={() => setShowLogoutDialog(true)}
        className={className}
      >
        Cerrar sesión
      </Button>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              ¿Realmente deseas cerrar tu sesión? Podrás volver a iniciar sesión
              en cualquier momento.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
              disabled={isLoggingOut}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowLogoutDialog(false);
                handleSignOut();
              }}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Cerrando sesión...
                </>
              ) : (
                "Sí, cerrar sesión"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutButton;
