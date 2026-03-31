"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteJournal } from "../server/create-journal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";

export function DeleteJournalDialog({ journalId }: { journalId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();


const { mutateAsync: removeJournal, isPending } = useMutation({
  mutationFn: deleteJournal,

  onSuccess: () => {
    // Refetch journals after deletion
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.journals });
    toast.success("Journal deleted");
    setOpen(false);
    router.push("/dashboard");
  },

  onError: (error: any) => {
    toast.error(error?.message || "Failed to delete");
  },
});

// Usage in handler
const handleDelete = () => {
  removeJournal(journalId);
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete journal</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 size={13} className="animate-spin mr-2" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 size={13} className="mr-2" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}