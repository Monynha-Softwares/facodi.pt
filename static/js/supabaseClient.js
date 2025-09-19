(function () {
  if (typeof window === 'undefined') {
    return;
  }

  const body = document.body;
  const dataset = body ? body.dataset : null;
  const url = dataset && dataset.supabaseUrl ? dataset.supabaseUrl : '';
  const anonKey = dataset && dataset.supabaseAnon ? dataset.supabaseAnon : '';

  if (!window.__FACODI_I18N__ && dataset && dataset.facodiI18n && typeof window.atob === 'function') {
    try {
      window.__FACODI_I18N__ = JSON.parse(window.atob(dataset.facodiI18n));
    } catch (err) {
      console.warn('[FACODI] Falha ao descodificar mensagens de i18n:', err);
    }
  }

  if (!url || !anonKey) {
    console.warn('[FACODI] Variáveis SUPABASE_URL ou SUPABASE_ANON_KEY não configuradas.');
    return;
  }

  window.__SUPABASE_URL__ = url;
  window.__SUPABASE_ANON_KEY__ = anonKey;

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
