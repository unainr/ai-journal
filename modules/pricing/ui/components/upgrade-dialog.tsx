"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  reason?: string; // what feature they tried to use
};

const PRO_FEATURES = [
  "Unlimited journals",
  "Unlimited images",
  "AI writing actions",
  "Diagram generation",
  "Shareable links",
];

export function UpgradeDialog({ open, onClose, reason }: Props) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center">
              <Sparkles size={15} className="text-amber-400" />
            </div>
            <DialogTitle>Upgrade to Pro</DialogTitle>
          </div>
          <DialogDescription>
            {reason ?? "You've reached the limit of your free plan."}
          </DialogDescription>
        </DialogHeader>

        {/* Features list */}
        <div className="flex flex-col gap-2 py-2">
          {PRO_FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <Check size={13} className="text-green-500 shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 py-1">
          <span className="text-2xl font-semibold text-foreground">$5</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => {
              onClose();
              router.push("/pricing");
            }}
            className="w-full gap-2"
          >
            <Sparkles size={13} />
            Upgrade to Pro
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full text-muted-foreground">
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}