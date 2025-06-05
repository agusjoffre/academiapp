"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import AuthForm from "@/components/forms/auth-form";
import { loginUser } from "@/lib/actions/auth/login-actions";
import { useRouter } from "next/navigation";
import { ErrorDialog } from "@/components/error-dialog";

const LoginPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await loginUser(data.email, data.password);

      if (response.success) {
        router.push("/");
      } else {
        setErrorMessage(response.error?.message || "An error occurred");
        setIsErrorOpen(true);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Iniciar sesión
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Ingresa tu email y contraseña para continuar
        </p>
      </div>

      <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} />

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>

      <ErrorDialog
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default LoginPage;
