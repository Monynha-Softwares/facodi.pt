import { createClient } from "@supabase/supabase-js";

import { clientEnv, serverEnv } from "@/lib/env";

type SupabaseClient = ReturnType<typeof createClient>;

export const createBrowserClient = (): SupabaseClient =>
  createClient(clientEnv.NEXT_PUBLIC_SUPABASE_URL, clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: true },
  });

export const createServiceClient = (): SupabaseClient => {
  if (!serverEnv.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for service client");
  }

  return createClient(clientEnv.NEXT_PUBLIC_SUPABASE_URL, serverEnv.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
    global: { headers: { "X-Client-Info": "monynha-portal" } },
  });
};
