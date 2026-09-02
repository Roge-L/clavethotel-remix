import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AppLoadContext } from "react-router";

/**
 * Cached per load context rather than in a module-level variable: on Workers a
 * single isolate serves many requests, and a module global would pin the first
 * request's environment for every request that followed.
 */
const clients = new WeakMap<AppLoadContext, SupabaseClient>();

export function getSupabaseClient(context: AppLoadContext): SupabaseClient {
  const cached = clients.get(context);
  if (cached) return cached;

  const supabaseUrl = context.cloudflare.env.SUPABASE_URL;
  const supabaseAnonKey = context.cloudflare.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
  clients.set(context, client);
  return client;
}
