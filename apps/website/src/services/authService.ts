import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AuthFunctionResult {
  status: "SUCCESS" | "ERROR";
  message: string;
  target_url: string | null;
  is_first_login: boolean;
}

/**
 * Fires the secure, multi-table RPC function inside our Supabase database.
 * Returns the raw error strings and generated URLs directly from the API.
 */
export async function verifyUserCredentials(
  usernameInput: string,
  passwordInput: string
): Promise<AuthFunctionResult> {
  try {
    const cleanUsername = usernameInput.trim();

    // Fix: We construct the object using sequential key assignments to enforce order over network payload parsing
    const rpcArguments: Record<string, string> = {};
    rpcArguments["input_username"] = cleanUsername;
    rpcArguments["input_password"] = passwordInput;

    // 1. Fire the centralized RPC verification function
    const { data, error } = await supabase.rpc("validate_user_login", rpcArguments);

    if (error) {
      return {
        status: "ERROR",
        message: error.message || "Database connection dropped.",
        target_url: null,
        is_first_login: false,
      };
    }

    // 2. Extract resulting data packet row
    if (Array.isArray(data) && data.length > 0) {
      return data[0] as AuthFunctionResult;
    }

    if (data && !Array.isArray(data)) {
      return data as AuthFunctionResult;
    }

    return {
      status: "ERROR",
      message: "An empty validation payload was returned from the server.",
      target_url: null,
      is_first_login: false,
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: err instanceof Error ? err.message : "System exception encountered.",
      target_url: null,
      is_first_login: false,
    };
  }
}