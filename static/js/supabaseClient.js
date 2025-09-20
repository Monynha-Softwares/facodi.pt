(function () {
  const namespace = (window.FACODI = window.FACODI || {});

  function readConfig() {
    const script = document.getElementById("facodi-config");
    if (!script) {
      console.warn("[FACODI] Configuração não encontrada (facodi-config).");
      return {};
    }

    try {
      return JSON.parse(script.textContent || "{}");
    } catch (error) {
      console.error("[FACODI] Não foi possível interpretar a configuração FACODI.", error);
      return {};
    }
  }

  const config = readConfig();
  namespace.config = Object.assign({
    supabaseUrl: "",
    supabaseAnonKey: "",
  }, config);

  const { supabaseUrl, supabaseAnonKey } = namespace.config;

  if (typeof window.supabase === "undefined") {
    console.warn("[FACODI] Biblioteca supabase-js não carregada. Verifique o CDN ou a ordem dos scripts.");
    namespace.supabase = null;
    return;
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.info("[FACODI] Supabase não configurado. Defina SUPABASE_URL e SUPABASE_ANON_KEY para habilitar a sincronização.");
    namespace.supabase = null;
    return;
  }

  try {
    namespace.supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
    console.debug("[FACODI] Cliente Supabase inicializado.");
  } catch (error) {
    namespace.supabase = null;
    console.error("[FACODI] Erro ao criar o cliente Supabase.", error);
  }
})();
