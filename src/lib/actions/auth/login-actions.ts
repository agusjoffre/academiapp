"use server";

import { createClient } from "@/lib/supabase";
import { AuthResponse } from "@/lib/types";

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!data) {
    return {
      data: null,
      error: {
        message: error?.message || "An unknown error occurred. Data not found.",
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
};
