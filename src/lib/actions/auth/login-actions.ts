"use server";

import { createClient } from "@/lib/supabase";
import { AuthResponse } from "@/lib/types";
import { loginSchema } from "@/lib/validations/auth";

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    // Validate input
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      return {
        data: null,
        error: {
          message: result.error.errors[0].message,
          code: "VALIDATION_ERROR",
        },
        status: 400,
        success: false,
      };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Manejar errores específicos de Supabase
      let errorMessage = "Error al iniciar sesión";

      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email o contraseña incorrectos";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Por favor confirma tu email antes de iniciar sesión";
      } else if (error.message.includes("User not found")) {
        errorMessage = "No existe una cuenta con este email";
      }

      return {
        data: null,
        error: {
          message: errorMessage,
          code: error.code,
        },
        status: error.status || 400,
        success: false,
      };
    }

    if (!data.user) {
      return {
        data: null,
        error: {
          message: "No se pudo obtener la información del usuario",
          code: "USER_NOT_FOUND",
        },
        status: 404,
        success: false,
      };
    }

    return {
      data: data.user,
      status: 200,
      success: true,
      message: "Usuario autenticado exitosamente",
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Error inesperado al iniciar sesión",
        code: "UNKNOWN_ERROR",
      },
      status: 500,
      success: false,
    };
  }
};
