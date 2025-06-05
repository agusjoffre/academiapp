"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import AuthForm from "@/components/forms/auth-form";
import { registerUser } from "@/lib/actions/auth/register-actions";
import { useRouter } from "next/navigation";
import { ErrorDialog } from "@/components/error-dialog";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await registerUser(data.email, data.password);

      if (response.success) {
        router.push("/login");
      } else {
        setErrorMessage(response.error?.message || "An error occurred");
        setIsErrorOpen(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred");
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Crear una cuenta
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Ingresa tu email y contraseña para registrarte
        </p>
      </div>

      <AuthForm
        type="register"
        onSubmit={handleRegister}
        isLoading={isLoading}
      />

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Inicia sesión
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

export default RegisterPage;
