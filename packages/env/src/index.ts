import { z } from "zod";

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url({ message: "NEXT_PUBLIC_SUPABASE_URL deve ser uma URL válida" }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY é obrigatório"),
});

const serverSchema = clientSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, "SUPABASE_SERVICE_ROLE_KEY é obrigatório para tarefas internas")
    .optional(),
});

type ServerEnv = z.infer<typeof serverSchema>;

const rawEnv: Record<keyof ServerEnv, string | undefined> = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

const parsedEnv = serverSchema.safeParse(rawEnv);

if (!parsedEnv.success) {
  if (process.env.SKIP_ENV_VALIDATION === "true") {
    console.warn(
      "⚠️  Variáveis de ambiente inválidas detectadas, mas a validação foi ignorada (SKIP_ENV_VALIDATION)."
    );
  } else {
    console.error(
      "\n❌ Variáveis de ambiente inválidas:",
      parsedEnv.error.format()
    );
    throw new Error(
      "Falha ao validar variáveis de ambiente. Consulte o README para configurar o Supabase."
    );
  }
}

export const env: ServerEnv = parsedEnv.success
  ? parsedEnv.data
  : {
      NEXT_PUBLIC_SUPABASE_URL: rawEnv.NEXT_PUBLIC_SUPABASE_URL ?? "",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: rawEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      SUPABASE_SERVICE_ROLE_KEY: rawEnv.SUPABASE_SERVICE_ROLE_KEY ?? undefined,
    };

export type Env = typeof env;
