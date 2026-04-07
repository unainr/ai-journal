"use server";

import { generateText } from "ai";
import { createGroq, groq } from "@ai-sdk/groq";
import { canGenerateDiagram } from "@/modules/pricing/server/pricing";

export const generateMermaidCode = async (prompt: string) => {
  const { allowed, error, upgrade } = await canGenerateDiagram();
  if (!allowed) return { error, upgrade };
  try {
   

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `You are an expert diagram architect. Generate a beautiful, well-structured Mermaid.js diagram for: "${prompt}".

RULES:
- Respond with ONLY raw Mermaid code. No markdown, no backticks, no explanation.
- Start directly with the diagram type keyword (graph, sequenceDiagram, flowchart, pie, etc.)

QUALITY GUIDELINES:
- Use "flowchart TD" or "flowchart LR" (not "graph") for flow-based diagrams — it renders cleaner
- Give every node a short, readable label (2-5 words max per node)
- Use subgraphs to group related nodes when there are 6+ nodes
- Prefer top-down (TD) for processes/flows, left-right (LR) for hierarchies/trees
- Use meaningful node shapes:
    - Rectangles [label] for actions/steps
    - Rounded rectangles (label) for start/end
    - Diamonds {label} for decisions
    - Stadiums([label]) for events/triggers
    - Cylinders[(label)] for databases/storage
- Add edge labels on connections where it clarifies the relationship (e.g. -->|yes| or -->|API call|)
- Keep it focused: 6–14 nodes is the sweet spot. Do not over-engineer.
- Ensure all node IDs are unique and alphanumeric (no spaces or special chars in IDs)

Return only the Mermaid code. Nothing else.`,
});

    // Ensure we strictly extract exactly what is inside the markdown block 
    // if the AI decided to be conversational.
    let cleanText = text;
    const mermaidMatch = text.match(/```(?:mermaid)?([\s\S]*?)```/i);
    if (mermaidMatch) {
      cleanText = mermaidMatch[1].trim();
    } else {
      // Fallback if no codeblocks were used
      cleanText = cleanText.replace(/```mermaid/gi, "").replace(/```/g, "").trim();
    }

    // Securely encode to URL-safe base64 on the server
    // This perfectly prevents + or / characters from breaking the URL
    const base64Code = Buffer.from(cleanText, "utf-8").toString("base64url");
    
    // Create the image URL using the IMG endpoint (which returns PNG) 
    // This makes it extremely easy to download as a standard image file!
    const imageUrl = `https://mermaid.ink/img/${base64Code}?type=png`;

    return { data: imageUrl };
  } catch (error) {
    console.error("Error generating mermaid:", error);
    return { error: "Failed to generate diagram." };
  }
};
