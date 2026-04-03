"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2 } from "lucide-react";
import { generateMermaidCode } from "../server/generate-mermaid";
import { toast } from "sonner";
import { Editor } from "@tiptap/react";
import { usePlan } from "@/modules/pricing/hooks/use-plan";


export function AiMermaidBar({ editor }: { editor: Editor | null }) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const { canGenerateDiagram } = usePlan();


  const handleGenerate = async () => {
    if (!prompt.trim() || !editor) return;

    // ✅ toast only — no dialog
    if (!canGenerateDiagram) {
      toast.error("Diagram generation is a Pro feature.", {
       
      });
      return;
    }

    setGenerating(true);
    const result = await generateMermaidCode(prompt);

    if (result.error) {
      toast.error(result.error);
    } else if (result.data) {
      try {
        editor.chain().focus().setImage({ src: result.data }).run();
        editor.commands.insertContent("<p></p>");
        setPrompt("");
        toast.success("Diagram generated and inserted!");
      } catch {
        toast.error("Failed to render diagram.");
      }
    }

    setGenerating(false);
  };

  return (
    <div className="flex items-center gap-3 px-6 py-3 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50">
      <Sparkles size={16} className="text-zinc-500 shrink-0" />
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask Groq AI to draw a flow chart or diagram (e.g. 'user checkout flow')..."
        className="h-8 text-xs border-zinc-200 dark:border-zinc-800 shadow-none bg-white dark:bg-zinc-900 focus-visible:ring-1"
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); handleGenerate(); }
        }}
        disabled={generating}
      />
      <Button
        onClick={handleGenerate}
        disabled={generating || !prompt.trim()}
        size="sm"
        className="h-8 text-xs px-4 shrink-0 font-medium"
      >
        {generating ? (
          <><Loader2 size={12} className="mr-2 animate-spin" />Generating...</>
        ) : "Draw Diagram"}
      </Button>
    </div>
  );
}