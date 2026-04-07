"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import mermaid from "mermaid";
import {
  ArrowRight, Sparkles, Wand2, Image as ImageIcon,
  PenLine, Bold, Italic, Strikethrough, List,
  Workflow, ArrowLeftToLine, ArrowRightFromLine,
  MessageSquare, Play, SpellCheck
} from "lucide-react";

const DIAGRAM = `
flowchart LR
  A([📥 Inbound Leads]) --> B{Qualification}
  B -->|Qualified| C[Sales Pipeline]
  B -->|Not Fit| D([❌ Disqualified])
  C --> E[Demo Call]
  E --> F{Decision}
  F -->|Yes| G([✅ Closed Won])
  F -->|Later| H([🔁 Nurture])
`.trim();

const MermaidDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#ede9fe",
            primaryBorderColor: "#7c3aed",
            primaryTextColor: "#1e1b4b",
            lineColor: "#4b5563",
            background: "#f8f9fa",
            nodeBorder: "#7c3aed",
            clusterBkg: "#f3f0ff",
            edgeLabelBackground: "#f8f9fa",
            fontFamily: "inherit",
          },
          flowchart: { curve: "basis", padding: 20 },
        });

        const id = `mermaid-hero-${Date.now()}`;
        const { svg } = await mermaid.render(id, DIAGRAM);

        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.maxWidth = "100%";
            svgEl.style.height = "auto";
            svgEl.removeAttribute("height");
          }
        }
      } catch (e) {
        console.error("Mermaid render failed:", e);
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full bg-[#f8f7ff] rounded-lg border border-[#e2e0f5] p-4 relative shadow-inner overflow-hidden min-h-45 flex items-center justify-center">
      <div ref={ref} className="w-full [&_svg]:max-w-full [&_svg]:h-auto" />
      <div className="absolute bottom-2 right-2">
        <span className="text-[10px] font-sans text-[#7c3aed] bg-[#ede9fe] px-2 py-0.5 rounded border border-[#7c3aed]/30">
          AI Generated Chart
        </span>
      </div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-28 pb-20  min-h-screen flex flex-col items-center justify-center ">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(216,75,103,0.1),transparent)] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-in fade-in duration-1000">

        <div className="text-center max-w-4xl mx-auto flex flex-col items-center mb-16">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-white hover:bg-white/10 transition-colors cursor-pointer">
              <Sparkles className="w-4 h-4 text-[#d84b67]" />
              <span>The Next-Generation AI Journal</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-[5rem] capitalize font-bold tracking-tighter  mb-6 leading-[1.1]"
          >
            Your thoughts  {" "}
            <span className="text-transparent capitalize bg-clip-text bg-linear-to-r from-red-400 via-[#d84b67] to-rose-300">
              amplified by AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-medium"
          >
            The ultimate smart journal. Write effortlessly, improve text with AI rewriting, and generate visual diagrams from your notes in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-[0_0_40px_-10px_#d84b67] bg-[#d84b67] hover:bg-[#c23a56] text-white hover:scale-[1.02] transition-all rounded-full font-bold">
                Start Journaling Free
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-300"
        >
          <div className="relative rounded-xl border border-[#222] bg-[#0d0d0d] shadow-2xl overflow-hidden ring-1 ring-white/5">

            {/* Mac chrome */}
            <div className="flex items-center px-4 py-3 bg-[#111] border-b border-[#222]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
            </div>

            <div className="flex h-160 w-full bg-[#0d0d0d]">

              {/* Sidebar */}
              <div className="w-64 border-r border-[#1a1a1a] flex flex-col bg-[#0f0f0f] shrink-0">
                <div className="p-4">
                  <button className="w-full py-2 px-4 bg-[#e5e5e5] text-black rounded-md flex items-center justify-center gap-2 text-sm font-semibold hover:bg-white transition-all shadow-sm">
                    <PenLine className="w-4 h-4" />
                    New entry
                  </button>
                </div>

                <div className="px-4 py-2 mt-2">
                  <span className="text-xs font-bold text-zinc-500 tracking-widest uppercase">Recent</span>
                </div>

                <div className="px-4 flex flex-col gap-1 mt-1">
                  {["Sales Pipeline Strategy", "Q3 Retrospective", "Product Roadmap", "Team Sync Notes"].map((title, i) => (
                    <div
                      key={title}
                      className={`px-3 py-2 rounded-md text-sm cursor-pointer truncate transition-colors ${
                        i === 0 ? "bg-white/8 text-white font-medium" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      {title}
                    </div>
                  ))}
                </div>

                <div className="flex-1" />

                <div className="p-4 border-t border-[#1a1a1a] flex items-center gap-3 hover:bg-white/5 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#d84b67] to-indigo-500 border border-[#333] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-zinc-200 truncate">My Workspace</span>
                    <span className="text-[11px] text-zinc-500 truncate">Pro Plan</span>
                  </div>
                </div>
              </div>

              {/* Editor */}
              <div className="flex-1 flex flex-col p-8 sm:p-10 overflow-y-auto bg-[#0d0d0d] min-w-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">Sales Pipeline Strategy</h1>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 mb-8 w-fit shrink-0">
                  <div className="flex items-center gap-1 rounded bg-[#111] border border-[#222] p-1">
                    <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#222] rounded transition-colors"><Bold className="w-4 h-4" /></button>
                    <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#222] rounded transition-colors"><Italic className="w-4 h-4" /></button>
                    <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#222] rounded transition-colors"><Strikethrough className="w-4 h-4" /></button>
                  </div>

                  <div className="w-px h-6 bg-[#333] mx-1" />

                  <div className="flex items-center gap-1 rounded bg-[#111] border border-[#222] p-1">
                    <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#222] rounded text-sm font-bold">H1</button>
                    <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#222] rounded text-sm font-bold">H2</button>
                  </div>

                  <div className="w-px h-6 bg-[#333] mx-1" />

                  <button className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#222] border border-transparent hover:border-[#333] rounded transition-colors">
                    <List className="w-4 h-4" />
                  </button>

                  <div className="w-px h-6 bg-[#333] mx-1" />

                  <button className="flex items-center gap-2 px-3 h-10 text-zinc-300 hover:text-white border border-[#222] bg-[#111] hover:bg-[#222] rounded transition-colors text-sm font-medium">
                    <ImageIcon className="w-4 h-4 text-zinc-400" />
                    Image
                  </button>

                  <button className="flex items-center gap-2 px-3 h-10 text-white bg-linear-to-r from-[#d84b67] to-[#f86c88] border border-[#d84b67]/50 rounded transition-all shadow-[0_0_15px_-3px_#d84b67] hover:brightness-110 text-sm font-semibold ml-2">
                    <Workflow className="w-4 h-4" />
                    AI Diagram
                  </button>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6 w-full max-w-3xl">

                  <div className="text-[17px] text-zinc-300 leading-relaxed">
                    <span className="relative inline">
                      <span className="bg-[#111827] text-[#93c5fd] border-b border-[#3b82f6] border-dashed py-0.5">
                        Our new inbound leads will be automatically routed and qualified before reaching the primary closing team.
                      </span>

                      {/* Floating AI toolbar */}
                      <span className="absolute -top-12 left-0 bg-[#1c1c1c] border border-[#2e2e2e] shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-full inline-flex items-center p-1 z-50 whitespace-nowrap h-10">
                        <span className="px-3 text-xs font-semibold text-zinc-500 border-r border-[#333] h-full flex items-center">AI</span>
                        <span className="flex items-center px-1 h-full gap-0.5">
                          {[
                            { icon: <Sparkles className="w-3.5 h-3.5 text-blue-400" />, label: "Improve", color: "text-[#e2e8f0]" },
                            { icon: <SpellCheck className="w-3.5 h-3.5 text-zinc-400" />, label: "Fix grammar", color: "text-[#e2e8f0]" },
                            { icon: <ArrowLeftToLine className="w-3.5 h-3.5 text-zinc-400" />, label: "Shorter", color: "text-[#e2e8f0]" },
                            { icon: <ArrowRightFromLine className="w-3.5 h-3.5 text-zinc-400" />, label: "Longer", color: "text-[#e2e8f0]" },
                            { icon: <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />, label: "Casual", color: "text-[#e2e8f0]" },
                            { icon: <Play className="w-3.5 h-3.5 text-[#60a5fa]" />, label: "Continue", color: "text-[#60a5fa]" },
                          ].map(({ icon, label, color }) => (
                            <span key={label} className={`flex items-center gap-1.5 px-2.5 h-full rounded-full hover:bg-[#2c2c2c] cursor-pointer ${color} font-medium text-[12px] transition-colors`}>
                              {icon}{label}
                            </span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </div>

                  <MermaidDiagram />

                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-[#d84b67] opacity-20 blur-[60px] rounded-full pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};