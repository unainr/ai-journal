"use client";

import { useState } from "react";

export function useUpgrade() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string | undefined>();

  const showUpgrade = (message?: string) => {
    setReason(message);
    setOpen(true);
  };

  return { open, reason, showUpgrade, onClose: () => setOpen(false) };
}