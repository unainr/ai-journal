"use client";

import { useState } from "react";
import { generateMermaidCode } from "../server/generate-mermaid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Download, Image as ImageIcon, Sparkles, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Editor } from "@tiptap/react";

type Props = {
  editor?: Editor | null;
};

export function AiMermaidDrawer({ editor }: Props) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [inserted, setInserted] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setImageUrl(null);
    setInserted(false);

    const result = await generateMermaidCode(prompt);

    if (result.error) {
      toast.error(result.error);
    } else if (result.data) {
      setImageUrl(result.data);
      toast.success("Diagram generated!");
    }

    setGenerating(false);
  };

  const handleInsertIntoEditor = () => {
    if (!imageUrl || !editor) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setInserted(true);
    toast.success("Diagram inserted into journal");
    setTimeout(() => setOpen(false), 600);
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `diagram-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Downloaded!");
    } catch {
      toast.error("Failed to download. Right-click the image to save.");
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="rounded-none" variant="primary" size="sm">
          <Sparkles size={13} />
          <span>AI Diagram</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[96vh] sm:h-[94vh] rounded-t-md border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-350 flex flex-col h-full overflow-hidden">

          <DrawerHeader className="shrink-0 pt-4 pb-2 text-left sm:text-center text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 px-6 sm:px-8">
            <DrawerTitle className="text-xl font-medium tracking-tight">AI Diagram Generator</DrawerTitle>
            <DrawerDescription className="sr-only">Generate flowcharts and insert them into your journal</DrawerDescription>

            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-3xl mx-auto mt-4">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your flowchart or sequence…"
                className="h-10 text-sm bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-md flex-1 shadow-sm focus-visible:ring-1 focus-visible:ring-indigo-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerate();
                }}
              />
              <Button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className="rounded-none"
                variant={'primary'}
              >
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate"}
              </Button>
            </div>
          </DrawerHeader>

          {/* Diagram area */}
          <div className="flex-1 overflow-hidden relative flex flex-col min-h-0 bg-transparent">
            {generating ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-500">
                <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                <p className="text-sm">Generating your diagram…</p>
              </div>
            ) : imageUrl ? (
              <>
                <ScrollArea className="w-full h-full">
                  <div className="w-max min-w-full min-h-screen sm:min-h-200 flex p-12 items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Generated AI Diagram"
                      className="max-w-none bg-white p-6 border border-zinc-200 shadow-sm rounded-md"
                    />
                  </div>
                  <ScrollBar orientation="horizontal" />
                  <ScrollBar orientation="vertical" />
                </ScrollArea>

                {/* Action buttons */}
                <div className="absolute top-4 right-6 z-10 flex items-center gap-2">
                  <Button
                    onClick={handleDownload}
                    variant="secondary"
                    className="h-9 px-4 rounded-md gap-2 border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </Button>

                  {editor && (
                    <Button
                      onClick={handleInsertIntoEditor}
                      disabled={inserted}
                      variant={'primary'}
                      className="rounded-nono"
                    >
                      {inserted ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5" />
                          Inserted
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3.5 h-3.5" />
                          Insert into journal
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-400">
                <ImageIcon className="w-10 h-10 opacity-30" />
                <p className="text-sm">Your diagram will appear here</p>
              </div>
            )}
          </div>

        </div>
      </DrawerContent>
    </Drawer>
  );
}