"use server"

import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
export type AIAction =
  | "improve"
  | "shorter"
  | "longer"
  | "casual"
  | "formal"
  | "continue"
  | "grammar";

const prompts: Record<AIAction, string> = {
  improve:  "Improve the writing quality. Keep the same meaning but make it clearer and more engaging. Return only the improved text, nothing else.",
  shorter:  "Make this text shorter and more concise. Keep the key points. Return only the shortened text, nothing else.",
  longer:   "Expand this text with more detail and depth. Keep the same tone. Return only the expanded text, nothing else.",
  casual:   "Rewrite this in a casual, conversational tone. Return only the rewritten text, nothing else.",
  formal:   "Rewrite this in a formal, professional tone. Return only the rewritten text, nothing else.",
  continue: "Continue writing from where this text ends. Match the tone and style naturally. Return only the continuation, nothing else.",
  grammar:  "Fix all grammar, spelling and punctuation errors. Return only the corrected text, nothing else.",
};
export const aiText = async (action: AIAction, content: string) => {
    try {
        const { text } = await generateText({
            model: groq("llama-3.3-70b-versatile"),
            system: prompts[action],
            prompt:content,
            maxOutputTokens:3000
        });
        return {success:true,data:text}
    } catch (error) {
        console.error("Error generating text:", error);
        return { success:false,error: "Failed to generate text." };
    }
}