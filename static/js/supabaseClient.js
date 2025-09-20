import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

let cachedClient = null;

const readMeta = (name) => {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta?.getAttribute("content")?.trim() ?? "";
};

export const getSupabaseConfig = () => {
  const url = readMeta("facodi:supabase-url");
  const anonKey = readMeta("facodi:supabase-anon-key");
  if (!url || !anonKey) {
    console.warn("[FACODI] Variáveis SUPABASE_URL ou SUPABASE_ANON_KEY não configuradas.");
    return null;
  }
  return { url, anonKey };
};

export const getClient = () => {
  if (cachedClient) {
    return cachedClient;
  }
  const config = getSupabaseConfig();
  if (!config) {
    return null;
  }
  cachedClient = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "X-FACODI-Client": "facodi-static",
      },
    },
  });
  return cachedClient;
};

export const isSupabaseAvailable = () => Boolean(getSupabaseConfig());
