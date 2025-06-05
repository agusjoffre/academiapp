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
    return {
      data: data.user,
      status: 200,
      success: true,
      message: "User logged in successfully",
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
