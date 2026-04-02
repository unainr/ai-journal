"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2 } from "lucide-react";
import { generateMermaidCode } from "../server/generate-mermaid";
import { toast } from "sonner";
import { Editor } from "@tiptap/react";
import { useUpgrade } from "@/modules/pricing/hooks/use-upgrade";
import { canGenerateDiagram } from "@/modules/pricing/server/pricing";
import { UpgradeDialog } from "@/modules/pricing/ui/components/upgrade-dialog";

export function AiMermaidBar({ editor }: { editor: Editor | null }) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
const { open, reason, showUpgrade, onClose } = useUpgrade();
  const handleGenerate = async () => {
    if (!prompt.trim() || !editor) return;
// ✅ check diagram limit
  const { allowed, error, upgrade } = await canGenerateDiagram();
    if (!allowed) {
    if (upgrade) {
      // hide any UI if needed (optional)
      showUpgrade(error ?? undefined); // show dialog immediately
    } else {
      toast.error(error ?? "Not allowed");
    }
    return;
  }
    setGenerating(true);
    const result = await generateMermaidCode(prompt);
    
    if (result.error) {
      toast.error(result.error);
    } else if (result.data) {
      try {
        // The server now handles the robust regex cleaning and base64 encoding
        // and returns the final SVG image url directly in result.data
        const imageUrl = result.data;
        
        // Ensure focus and insert the diagram
        editor.chain().focus().setImage({ src: imageUrl }).run();
        
        // Add a blank paragraph after the image for easy typing continuation
        editor.commands.insertContent('<p></p>');
        
        setPrompt("");
        toast.success("Diagram generated and inserted!");
      } catch (e) {
        toast.error("Failed to render diagram code.");
      }
    }
    
    setGenerating(false);
  };

  return (
    <>
    
    <div className="flex items-center gap-3 px-6 py-3 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50">
      <Sparkles size={16} className="text-zinc-500 shrink-0" />
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask Groq AI to draw a flow chart or diagram (e.g. 'user checkout flow')..."
        className="h-8 text-xs border-zinc-200 dark:border-zinc-800 shadow-none bg-white dark:bg-zinc-900 focus-visible:ring-1"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleGenerate();
          }
        }}
        disabled={generating}
      />
      <Button
        onClick={handleGenerate}
        disabled={generating || !prompt.trim()}
        size="sm"
        className="h-8 text-xs px-4 shrink-0 transition-all font-medium"
      >
        {generating ? (
          <>
            <Loader2 size={12} className="mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          "Draw Diagram"
        )}
      </Button>
    </div>
    {/* ✅ add this */}
    <UpgradeDialog open={open} onClose={onClose} reason={reason} />
    </>
  );
}
