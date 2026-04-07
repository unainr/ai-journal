import { DashboardView } from "@/modules/dashboard/ui/view/dashboard-view"
import { auth } from "@clerk/nextjs/server";
import { BookOpen, PenLine, Sparkles } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { userId } = await auth();
    if (!userId) redirect("/sign-in");
  return (
    <>
     <div className="flex min-h-screen flex-col items-center justify-center px-4">
      
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d84b67]/6 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Icon */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/8 bg-white/4">
          <BookOpen className="h-9 w-9 text-zinc-600" />
        </div>

        {/* Text */}
        <h1 className="mb-3 text-2xl font-bold tracking-tight ">
          Your journal is empty
        </h1>
        <p className="mb-10 max-w-sm text-sm leading-relaxed text-zinc-500">
          Start writing your first entry. Capture your thoughts, ideas, and moments — let AI help you go deeper.
        </p>

        {/* CTA */}
        <Link
          href="/dashboard/new"
          className="flex items-center gap-2 rounded-full bg-[#d84b67] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#c23d59] active:scale-95"
        >
          <PenLine className="h-4 w-4" />
          Write your first entry
        </Link>

        {/* Subtle hint */}
        <p className="mt-6 flex items-center gap-1.5 text-xs text-zinc-700">
          <Sparkles className="h-3 w-3" />
          AI writing assist is ready when you are
        </p>

      </div>
    </div>
    </>
  )
}

export default DashboardPage