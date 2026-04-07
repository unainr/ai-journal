"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Start with a thought",
      description: "Open a clean, distraction-free document and start pouring your ideas out onto the page.",
    },
    {
      step: "02",
      title: "Enrich with AI & Media",
      description: "Embed images, refine your tone using AI text tools, and structure your paragraphs beautifully.",
    },
    {
      step: "03",
      title: "Visualize concepts",
      description: "Ask the AI to generate Mermaid diagrams to map out your architecture, workflows, or mind maps.",
    },
  ];

  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              How <span className="text-[#d84b67]">InkFlow</span> works
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg">
              We've designed a workflow that stays out of your way, giving you powerful tools exactly when you need them.
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#d84b67]/10 text-[#d84b67] font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Abstract visual or list of benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Visual Container */}
            <div className="relative rounded-2xl border border-border bg-muted/20 p-8 overflow-hidden aspect-square flex flex-col justify-center">
              
              {/* Background styling elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d84b67]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

              <div className="relative z-10 flex flex-col gap-6">
                {[
                  "Frictionless rich text editor",
                  "AI-driven text rewrites",
                  "Instant Mermaid charts",
                  "Secure document storage",
                  "Real-time sync",
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                    className="flex items-center gap-3 bg-background border border-border p-4 rounded-xl shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#d84b67]" />
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
