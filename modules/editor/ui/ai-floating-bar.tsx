"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Editor } from "@tiptap/react";
import { toast } from "sonner";
import {
  Wand2, Minimize2, Maximize2,
  MessageSquare, Play, SpellCheck, Loader2,
} from "lucide-react";
import { AIAction, aiText } from "../server/ai-text";
import { Button } from "@/components/ui/button";

const ACTIONS: { value: AIAction; label: string; icon: React.ReactNode }[] = [
  { value: "improve",  label: "Improve",       icon: <Wand2 size={11} /> },
  { value: "grammar",  label: "Fix grammar",   icon: <SpellCheck size={11} /> },
  { value: "shorter",  label: "Shorter",       icon: <Minimize2 size={11} /> },
  { value: "longer",   label: "Longer",        icon: <Maximize2 size={11} /> },
  { value: "casual",   label: "Casual",        icon: <MessageSquare size={11} /> },
  { value: "formal",   label: "Formal",        icon: <MessageSquare size={11} /> },
  { value: "continue", label: "Continue",      icon: <Play size={11} /> },
];

export default function AIFloatingBar({ editor }: { editor: Editor | null }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [loading, setLoading] = useState<AIAction | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    if (from === to) { setVisible(false); return; }

    // use browser Selection API for accurate position
    const domSelection = window.getSelection();
    if (!domSelection || domSelection.rangeCount === 0) { setVisible(false); return; }

    const range = domSelection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const editorEl = editor.view.dom as HTMLElement;
    const editorRect = editorEl.getBoundingClientRect();

    setPos({
      top: rect.top - editorRect.top - 52,
      left: Math.min(
        Math.max(0, rect.left - editorRect.left),
        editorRect.width - 480 // prevent overflow
      ),
    });
    setVisible(true);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    editor.on("selectionUpdate", updatePosition);
    return () => { editor.off("selectionUpdate", updatePosition); };
  }, [editor, updatePosition]);

  // hide when clicking outside bar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        // only hide if not clicking inside editor
        const editorEl = editor?.view?.dom;
        if (editorEl && editorEl.contains(e.target as Node)) return;
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [editor]);

  const handleAction = async (action: AIAction) => {
    if (!editor || loading) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ");

    if (!selectedText.trim()) {
      toast.error("Select some text first");
      return;
    }

    setLoading(action);
const result = await aiText(action, selectedText);    
setLoading(null);

    if (result.error || !result.data) {
      toast.error(result.error ?? "AI failed, try again");
      return;
    }

    if (action === "continue") {
      // append after selection
      editor
        .chain()
        .focus()
        .insertContentAt(to, " " + result.data)
        .run();
    } else {
      // replace selection
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .insertContentAt(from, result.data)
        .run();
    }

    setVisible(false);
    toast.success("Done");
  };

  if (!visible) return null;

  return (
  <div
  ref={barRef}
  style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
  className="absolute z-50 flex items-center gap-0.5 px-1.5 py-1.5 rounded-xl border border-border bg-popover shadow-2xl"
>
  {/* Label */}
  <span className="text-[10px] text-muted-foreground px-1.5 mr-1 border-r border-border pr-2.5">
    AI
  </span>
  {ACTIONS.map((action) => (
    <Button
    variant={'ghost'}
      key={action.value}
      type="button"
      disabled={!!loading}
      onClick={() => handleAction(action.value)}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all text-[11px] font-medium disabled:opacity-30 whitespace-nowrap"
    >
      {loading === action.value
        ? <Loader2 size={11} className="animate-spin" />
        : action.icon
      }
      {action.label}
    </Button>
  ))}
</div>
  );
}