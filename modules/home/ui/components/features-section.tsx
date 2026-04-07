"use client";

import { motion } from "motion/react";
import { FileText, Image as ImageIcon, Workflow, Sparkles } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Structure Your Thoughts",
      description:
        "Create rich documents with a Notion-like editing experience. Format text, add headings, and organize your ideas effortlessly.",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Visual Assets & Media",
      description:
        "Seamlessly insert images and media directly into your journal. Drag, drop, and resize to build visually engaging content.",
      icon: ImageIcon,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "AI Diagram Generation",
      description:
        "Describe what you want to build, and let AI generate full Mermaid diagrams instantly. Visualize workflows without writing code.",
      icon: Workflow,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "AI Text Improvement",
      description:
        "Stuck on phrasing? Select any text and let our AI expand, summarize, or improve your writing to match your desired tone.",
      icon: Sparkles,
      color: "text-[#d84b67]",
      bgColor: "bg-[#d84b67]/10",
      borderColor: "border-[#d84b67]/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to <span className="text-[#d84b67]">build your knowledge</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            InkFlow combines the simplicity of a blank page with the power of modern AI tools to give you the ultimate creative workspace.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group rounded-2xl border border-border bg-background p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${feature.bgColor} ${feature.borderColor} ${feature.color}`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
