'use client'
import { PenLine, BookOpen, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getJournals } from "../server/create-journal";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function JournalSidebarList() {
 
 const {data:journals,isLoading} = useQuery(
    {
        queryKey:['journals'],
        queryFn:getJournals
    }
    
 )

console.log(journals?.data)
  return (
    <div className="flex flex-col gap-1">
      {/* New entry button */}
     <Link href={'/dashboard/new'}>
      <Button
      variant={'default'}
        className="w-full"
        >
        <PenLine size={12} />
        New entry
      </Button>
        </Link>

      {/* Section label */}
      <p className="text-[10px] uppercase tracking-widest text-zinc-600 px-3 mb-1">
        Recent
      </p>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center gap-2 px-3 py-2 text-zinc-600">
          <Loader2 size={12} className="animate-spin" />
          <span className="text-xs">Loading…</span>
        </div>
      )}

      {/* Empty */}
      {!isLoading && journals?.data?.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-6 px-3">
          <BookOpen size={16} className="text-zinc-700" />
          <p className="text-xs text-zinc-600 text-center">No journals yet</p>
        </div>
      )}

      {/* List */}
      {journals?.data?.map((journal) => {
        return (
          <Link
            key={journal.id}
            href={`/dashboard/${journal.id}`}
            className={`
              flex flex-col gap-0.5 px-3 py-2 rounded-lg transition-all duration-150 group text-left w-full
             
            `}
          >
            <span className="text-xs font-medium truncate">
              {journal.title || "Untitled"}
            </span>
            <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500">
              {journal.createdAt
                ? formatDistanceToNow(new Date(journal.createdAt), {
                    addSuffix: true,
                  })
                : "—"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}