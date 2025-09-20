import { z } from "zod";

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

type ServerSchema = z.infer<typeof serverSchema>;
type ClientSchema = z.infer<typeof clientSchema>;

const parseEnv = <Schema extends z.ZodTypeAny>(
  schema: Schema,
  data: Record<string, string | undefined>,
) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = result.error.errors
      .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
      .join("\n");
    throw new Error(message);
  }

  return result.data as z.infer<Schema>;
};

export const serverEnv: ServerSchema = parseEnv(serverSchema, {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

export const clientEnv: ClientSchema = parseEnv(clientSchema, {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export type Env = ServerSchema & ClientSchema;
