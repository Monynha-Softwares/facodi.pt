(function () {
  if (typeof window === 'undefined') {
    return;
  }

  const url = window.__SUPABASE_URL__;
  const anonKey = window.__SUPABASE_ANON_KEY__;

  if (!url || !anonKey) {
    console.warn('[FACODI] Variáveis SUPABASE_URL ou SUPABASE_ANON_KEY não configuradas.');
    return;
  }

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.error('[FACODI] Biblioteca supabase-js não carregada.');
    return;
  }

  const client = window.supabase.createClient(url, anonKey, {
    auth: {
      persistSession: false,
    },
  });

  window.facodi = window.facodi || {};
  window.facodi.supabase = client;
})();
