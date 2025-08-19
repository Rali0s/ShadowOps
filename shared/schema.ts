import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  subscriptionTier: text("subscription_tier").default("none"), // none, recruit, operative, operator, shadow
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  isActive: boolean("is_active").default(true),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Database documents for terminal file system simulation
export const dbDocuments = pgTable("db_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: text("document_id").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  classification: text("classification").notNull(),
  accessLevel: text("access_level").notNull(), // none, recruit, operative, operator, shadow
  fileType: text("file_type").default("txt"),
  fileSize: integer("file_size").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations - simplified for tier-based access only
export const usersRelations = relations(users, ({ many }) => ({
  // Relations removed with course system
}));

export const dbDocumentsRelations = relations(dbDocuments, ({ one }) => ({
  // No direct user relation - access controlled by tier level
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
  isActive: true,
  isAdmin: true,
});

export const insertDbDocumentSchema = createInsertSchema(dbDocuments).omit({
  id: true,
  createdAt: true,
  isActive: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDbDocument = z.infer<typeof insertDbDocumentSchema>;
export type DbDocument = typeof dbDocuments.$inferSelect;
