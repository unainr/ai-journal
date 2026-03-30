"use server";

import { db } from "@/drizzle/db";
import { Journals, journals } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, and } from "drizzle-orm";

type CreateJournalInput = {
  title?: string;
  content: string;
  imageUrls?: string[];
};

export const createJournal = async (input: CreateJournalInput) => {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  if (!input.content) return { error: "Content is required" };

  try {
    const [journal] = await db
      .insert(journals)
      .values({
        userId,
        title: input.title ?? null,
        content: input.content,
        imageUrls: input.imageUrls ?? [],
      })
      .returning();

    return { data: journal };
  } catch (error) {
    console.error("Create journal error:", error);
    return { error: "Failed to create journal" };
  }
};

type UpdateJournalInput = {
  id: string;
  title?: string;
  content: string;
  imageUrls?: string[];
};

export const updateJournal = async (input: UpdateJournalInput) => {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  if (!input.content) return { error: "Content is required" };

  try {
    const [journal] = await db
      .update(journals)
      .set({
        title: input.title ?? null,
        content: input.content,
        imageUrls: input.imageUrls ?? [],
      })
      .where(and(eq(journals.id, input.id), eq(journals.userId, userId))) 
      .returning();

    if (!journal) {
      return { error: "Journal not found or you don't have permission to update it" };
    }

    return { data: journal };
  } catch (error) {
    console.error("Update journal error:", error);
    return { error: "Failed to update journal" };
  }
};


export const getJournals = async () => {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" }; // ✅ always return data

  try {
    const data = await db
      .select()
      .from(journals)
      .where(eq(journals.userId, userId))
      .orderBy(desc(journals.createdAt));

    return {success:true,data:data}
  } catch (error) {
    console.error("getJournals error:", error);
    return { success:false, error: "Failed to fetch journals" };
  }
};

// get journal by id

export const getJournalById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" }; // ✅ always return data

try {
  const result:Journals[] = await db.select().from(journals).where(eq(journals.id, id));
  if(result.length===0) return{success:false,error:"Journal not found"}
  const journal = result[0];
  return {success: true, data: journal}
} catch (error) {
  return{success:false, error: "Failed to fetch journal"}
}
}