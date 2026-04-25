import type { User } from "@prisma/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

type SupabaseClientLike = {
  auth: {
    updateUser: (attributes: { data: Record<string, unknown> }) => Promise<{
      error: { message: string } | null;
    }>;
  };
};

function createAnonymousDisplayName(seed: string): string {
  const normalized = seed.trim().toLowerCase() || "guest";
  const compact = normalized.replace(/[^a-z0-9]/g, "").slice(0, 6) || "guest";
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `anon-${compact}-${suffix}`;
}

function readSupabaseDisplayName(user: SupabaseUser): string | null {
  const metadata = user.user_metadata ?? {};
  const value = metadata.display_name;
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function readSupabaseName(user: SupabaseUser): string | null {
  const metadata = user.user_metadata ?? {};
  const fullName = metadata.full_name;
  if (typeof fullName === "string" && fullName.trim().length > 0) {
    return fullName.trim();
  }

  const name = metadata.name;
  return typeof name === "string" && name.trim().length > 0 ? name.trim() : null;
}

export async function syncSupabaseUserToPrisma(
  user: SupabaseUser,
  supabase?: SupabaseClientLike,
): Promise<User> {
  const email = user.email?.trim().toLowerCase();
  if (!email) {
    throw new Error("Supabase user email is required.");
  }

  const supabaseDisplayName = readSupabaseDisplayName(user);
  const resolvedName = readSupabaseName(user);

  const upsertedUser = await prisma.user.upsert({
    where: { email },
    update: {
      provider: "GOOGLE",
      name: resolvedName,
      password: null,
      ...(supabaseDisplayName ? { displayName: supabaseDisplayName } : {}),
    },
    create: {
      email,
      provider: "GOOGLE",
      password: null,
      name: resolvedName,
      displayName: supabaseDisplayName ?? createAnonymousDisplayName(email),
    },
  });

  if (!supabase || !upsertedUser.displayName) {
    return upsertedUser;
  }

  if (supabaseDisplayName !== upsertedUser.displayName) {
    const { error } = await supabase.auth.updateUser({
      data: {
        display_name: upsertedUser.displayName,
      },
    });

    if (error) {
      throw new Error(`Failed to sync displayName to Supabase: ${error.message}`);
    }
  }

  return upsertedUser;
}
