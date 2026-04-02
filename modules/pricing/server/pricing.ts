"use server";

import { FREE_LIMITS } from "@/constants";
import { db } from "@/drizzle/db";
import { journals } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, count } from "drizzle-orm";



// ─── Check plan ───────────────────────────────────────────────
export const checkPlan = async () => {
  const { userId, has } = await auth();
  if (!userId) return { isPro: false, userId: null };
  const isPro = has({ plan: "pro" });
  return { isPro, userId };
};

// ─── Can create journal ───────────────────────────────────────
export const canCreateJournal = async () => {
  const { userId, has } = await auth();
  if (!userId) return { allowed: false, upgrade: false, error: "Unauthorized" };

  const isPro = has({ plan: "pro" });
  if (isPro) return { allowed: true, upgrade: false, error: null };

  const [{ total }] = await db
    .select({ total: count() })
    .from(journals)
    .where(eq(journals.userId, userId));

  if (total >= FREE_LIMITS.journals) {
    return {
      allowed: false,
      upgrade: true,
      error: `Free plan allows up to ${FREE_LIMITS.journals} journals. Upgrade to Pro for unlimited.`,
    };
  }

  return { allowed: true, upgrade: false, error: null };
};

// ─── Can upload image ─────────────────────────────────────────
export const canUploadImage = async (currentImageCount: number) => {
  const { userId, has } = await auth();
  if (!userId) return { allowed: false, upgrade: false, error: "Unauthorized" };

  const isPro = has({ plan: "pro" });
  if (isPro) return { allowed: true, upgrade: false, error: null };

  if (currentImageCount >= FREE_LIMITS.images) {
    return {
      allowed: false,
      upgrade: true,
      error: `Free plan allows ${FREE_LIMITS.images} image per journal. Upgrade to Pro for unlimited.`,
    };
  }

  return { allowed: true, upgrade: false, error: null };
};

// ─── Can use AI writing ───────────────────────────────────────
export const canUseAI = async () => {
  const { userId, has } = await auth();
  if (!userId) return { allowed: false, upgrade: false, error: "Unauthorized" };

  // free plan gets limited AI — feature key matches your Clerk dashboard
  const hasUnlimitedAI = has({ feature: "ai_writing" });
  if (!hasUnlimitedAI) {
    return {
      allowed: false,
      upgrade: true,
      error: "AI writing is limited on the free plan. Upgrade to Pro for full access.",
    };
  }

  return { allowed: true, upgrade: false, error: null };
};

// ─── Can generate diagram ─────────────────────────────────────
export const canGenerateDiagram = async () => {
  const { userId, has } = await auth();
  if (!userId) return { allowed: false, upgrade: false, error: "Unauthorized" };

  const hasDiagram = has({ feature: "diagram_generation" });
  if (!hasDiagram) {
    return {
      allowed: false,
      upgrade: true,
      error: "Diagram generation is limited on the free plan. Upgrade to Pro.",
    };
  }

  return { allowed: true, upgrade: false, error: null };
};

// ─── Get image limit for user ─────────────────────────────────
export const getImageLimit = async () => {
  const { userId, has } = await auth();
  if (!userId) return { limit: 0 };
  const isPro = has({ plan: "pro" });
  return { limit: isPro ? Infinity : FREE_LIMITS.images };
};