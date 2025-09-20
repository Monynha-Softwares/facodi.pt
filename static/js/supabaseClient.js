(function () {
  const logPrefix = '[FACODI]';
  const configElement = document.getElementById('facodi-config');
  if (!configElement) {
    console.warn(`${logPrefix} Configuração Supabase não encontrada.`);
    return;
  }

  let config;
  try {
    config = JSON.parse(configElement.textContent || '{}');
  } catch (error) {
    console.error(`${logPrefix} Não foi possível interpretar as configurações do Supabase.`, error);
    return;
  }

  const supabaseUrl = config.supabaseUrl || '';
  const supabaseAnonKey = config.supabaseAnonKey || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(`${logPrefix} Variáveis SUPABASE_URL ou SUPABASE_ANON_KEY não configuradas.`);
    return;
  }

  if (typeof window === 'undefined' || typeof window.supabase === 'undefined') {
    console.warn(`${logPrefix} Biblioteca supabase-js não carregada.`);
    return;
  }

  try {
    const client = window.supabase.createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    });
    window.facodiSupabase = client;
    console.info(`${logPrefix} Cliente Supabase inicializado.`);
  } catch (error) {
    console.error(`${logPrefix} Erro ao inicializar o Supabase.`, error);
  }
})();
