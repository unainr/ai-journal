"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "What is InkFlow?",
    answer: "InkFlow is an AI-powered journaling and document creation platform. It blends a clean, Notion-like writing experience with advanced AI tools that can generate diagrams, improve your text, and help structure your thoughts.",
  },
  {
    question: "How does the AI Mermaid Diagram generation work?",
    answer: "You simply describe the workflow, architecture, or mind map you want to create in plain English. Our specialized AI model interprets your request and instantly generates the corresponding Mermaid.js syntax, rendering a beautiful visual diagram directly in your document.",
  },
  {
    question: "Can I import my existing notes from Notion or Obsidian?",
    answer: "Yes! We support importing standard Markdown files as well as Notion exports (HTML/Markdown). You can easily bring your existing knowledge base over to InkFlow without losing formatting.",
  },
  {
    question: "Is there a limit to how much AI I can use?",
    answer: "Our Free plan includes generous rate limits for basic AI text improvements. The Pro and Team plans include unlimited text generation and up to 500 diagram generations per month to ensure fair use.",
  },
  {
    question: "How secure is my data?",
    answer: "We take privacy very seriously. Your documents are encrypted both in transit and at rest. We do not use your private personal journal entries to train our public models without explicit consent.",
  },
];

export const FaqSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked <span className="text-[#d84b67]">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border bg-muted/20 px-6 py-2 rounded-xl data-[state=open]:bg-muted/50 data-[state=open]:border-[#d84b67]/30 transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-[#d84b67] transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
