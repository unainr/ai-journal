"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "InkFlow entirely replaced my need for Notion and external AI tools. The inline Mermaid diagram generation has saved me dozens of hours a week on architectural docs.",
    author: "Sarah J.",
    role: "Lead Software Engineer",
    company: "TechNexus",
  },
  {
    content: "The cleanest editor I've ever used. The AI text improvement feature perfectly matches the tone I need for our executive summaries. Worth every penny.",
    author: "Michael T.",
    role: "Product Manager",
    company: "Lumiere Inc",
  },
  {
    content: "We moved our entire startup's knowledge base to InkFlow. It's fast, gorgeous, and the rich media integration is flawless.",
    author: "Elena R.",
    role: "Founding Designer",
    company: "StudioX",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/20 border-y border-border/50 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(216,75,103,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d84b67] to-[#f86c88]">creators</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here is what leading professionals are saying about InkFlow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-background border border-border p-8 rounded-2xl shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground text-lg italic leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d84b67]/80 to-purple-500/80 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, <span className="text-[#d84b67]/80 font-medium">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
