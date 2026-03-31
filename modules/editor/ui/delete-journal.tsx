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

export function DeleteJournalDialog({ journalId }: { journalId: string }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
   try{
    setDeleting(true);
    const result = await deleteJournal(journalId);

    if (!result.success) {
      toast.error(result.error ?? "Failed to delete");
      return;
    }else{

        toast.success("Journal deleted");
        setOpen(false);
        router.push("/dashboard");
    }
   }catch(error){
    console.log(error)
   }finally{
    setDeleting(false);
   }
   
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <Trash2 size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete journal</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This journal will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
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