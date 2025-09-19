import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const url = window?.SUPABASE_URL;
const anonKey = window?.SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn("FACODI: variáveis SUPABASE_URL e/ou SUPABASE_ANON_KEY não definidas. Conteúdo dinâmico ficará indisponível.");
}

export const supabase = url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null;

export function ensureClient() {
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }
  return supabase;
}
