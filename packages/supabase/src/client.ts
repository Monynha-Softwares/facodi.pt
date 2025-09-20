import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { env } from "@monynha/env";

import type { Database } from "./types";

let browserClient: SupabaseClient<Database> | null = null;

export const isSupabaseConfigured = Boolean(
  env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: false,
        },
      }
    );
  }

  return browserClient;
}

export type { Database };
