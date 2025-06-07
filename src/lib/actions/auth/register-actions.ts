"use server";

import { createClient } from "@/lib/supabase";
import { AuthResponse } from "@/lib/types";
import { registerSchema } from "@/lib/validations/auth";

export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    // Validate input
    const result = registerSchema.safeParse({ email, password });
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("registrando...");

    if (!data) {
      return {
        data: null,
        error: {
          message:
            error?.message || "An unknown error occurred. Data not found.",
          code: error?.code,
        },
        status: error?.status || 500,
        success: false,
      };
    }

    console.log("registrado con exito...", data.user);

    return {
      data: data.user,
      status: 200,
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
        code: "UNKNOWN_ERROR",
      },
      status: 500,
      success: false,
    };
  }
};
