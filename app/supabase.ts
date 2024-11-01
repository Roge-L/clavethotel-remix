import { createClient } from "@supabase/supabase-js";
import type { AppLoadContext } from "@remix-run/cloudflare";

let supabase: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient(context: AppLoadContext) {
  if (supabase) return supabase;

  const supabaseUrl = context.cloudflare.env.SUPABASE_URL;
  const supabaseAnonKey = context.cloudflare.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
}
