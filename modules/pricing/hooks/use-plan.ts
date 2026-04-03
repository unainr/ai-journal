"use client";

import { FREE_LIMITS } from "@/constants";
import { useEffect, useState } from "react";
import { getUserPlan } from "../server/pricing";

type Plan = {
  isPro: boolean;
  journalCount: number;
};

export function usePlan() {
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    getUserPlan().then(setPlan);
  }, []);

  // instant checks — no server round trip
  const canUseAI = plan?.isPro ?? false;
  const canGenerateDiagram = plan?.isPro ?? false;
  const canUploadImage = (currentCount: number) =>
    plan?.isPro ? true : currentCount < FREE_LIMITS.images;
  const canCreateJournal = plan?.isPro
    ? true
    : (plan?.journalCount ?? 0) < FREE_LIMITS.journals;

  return {
    plan,
    isPro: plan?.isPro ?? false,
    canUseAI,
    canGenerateDiagram,
    canUploadImage,
    canCreateJournal,
  };
}