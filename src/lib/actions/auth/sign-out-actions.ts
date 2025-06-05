"use server";

import { createClient } from "@/lib/supabase";
import { SignOutResponse } from "@/lib/types";

export const signOutUser = async (): Promise<SignOutResponse> => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      message: error.message || "An unknown error occurred while signing out.",
    };
  }

  return {
    success: true,
    message: "User signed out successfully",
  };
};
