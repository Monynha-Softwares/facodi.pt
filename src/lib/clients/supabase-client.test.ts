import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const originalEnv = { ...process.env };

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({ auth: {} })),
}));

describe("supabase client", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon",
      SUPABASE_SERVICE_ROLE_KEY: "service",
    };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("creates browser client", async () => {
    const { createBrowserClient } = await import("./supabase-client");

    expect(createBrowserClient()).toBeDefined();
  });

  it("creates service client", async () => {
    const { createServiceClient } = await import("./supabase-client");

    expect(createServiceClient()).toBeDefined();
  });
});
