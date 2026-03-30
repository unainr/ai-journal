import {
	pgTable,
	uuid,
	text,
	timestamp,
	boolean,
	jsonb,
} from "drizzle-orm/pg-core";

export const journals = pgTable("journals", {
	id: uuid("id").defaultRandom().primaryKey(),

	userId: text("user_id").notNull(),

	// content
	title: text("title"),
	content: text("content").notNull(), // raw (editor HTML)

	// AI outputs
	summary: text("summary"),
	emotions: jsonb("emotions"),
	tone: text("tone"),
	tags: jsonb("tags"),

	// visualization
	mermaid: text("mermaid"),

	// sharing
	isPublic: boolean("is_public").default(false),
	isUnlisted: boolean("is_unlisted").default(false),
	slug: text("slug").unique(),

	// media
	imageUrls: jsonb("image_urls").$type<string[]>().default([]),
	// ui
	theme: text("theme").default("default"),

	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});
export type Journals = typeof journals.$inferSelect;
export type JournalsInsert = typeof journals.$inferInsert;
