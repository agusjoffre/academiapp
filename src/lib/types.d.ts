import { User } from "@supabase/supabase-js";

/* Auth Types */
export type AuthResponse = {
  data: User | null;
  error?: {
    message: string;
    code?: string;
  };
  status: number;
  success: boolean;
  message?: string;
};

export type SignOutResponse = {
  success: boolean;
  message: string;
};

/*-----------*/
