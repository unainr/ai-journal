export const QUERY_KEYS = {
  journals: ["journals"],
  journal: (id: string) => ["journals", id],
};


// ─── Plan limits ──────────────────────────────────────────────
export const FREE_LIMITS = {
  journals: 5,
  images: 1,
} as const;

