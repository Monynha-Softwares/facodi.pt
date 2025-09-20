import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const originalEnv = { ...process.env };

describe("env", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("parses environment variables", async () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon",
      SUPABASE_SERVICE_ROLE_KEY: "service",
    };

    const envModule = await import("./env");
    expect(envModule.clientEnv.NEXT_PUBLIC_SUPABASE_URL).toBe("https://example.supabase.co");
    expect(envModule.serverEnv.SUPABASE_SERVICE_ROLE_KEY).toBe("service");
  });

  it("throws when missing client variables", async () => {
    process.env = { ...originalEnv };

    await expect(import("./env")).rejects.toThrow();
  });
});
