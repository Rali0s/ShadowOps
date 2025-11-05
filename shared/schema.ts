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
  subscriptionTier: text("subscription_tier").default("none"), // none, alpha, beta, theta, gamma
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  discordId: text("discord_id"),
  discordUsername: text("discord_username"),
  discordAvatar: text("discord_avatar"),
  discordVerified: boolean("discord_verified").default(false),
  auth0Id: text("auth0_id"),
  auth0Username: text("auth0_username"),
  auth0Avatar: text("auth0_avatar"),
  isActive: boolean("is_active").default(true),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Password reset tokens
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  token: text("token").notNull().unique(),
  userId: varchar("user_id").notNull().references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
  isUsed: boolean("is_used").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Database documents for terminal file system simulation and research archive
export const dbDocuments = pgTable("db_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: text("document_id").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  classification: text("classification").notNull(),
  accessLevel: text("access_level").notNull(), // none, alpha, beta, theta, gamma
  fileType: text("file_type").default("txt"),
  fileSize: integer("file_size").notNull(),
  category: text("category").default("general"), // general, research, operational, training
  tags: text("tags").array().default(sql`'{}'::text[]`), // flexible tagging system
  author: text("author"),
  summary: text("summary"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// RV Training Targets - Geographic locations, objects, symbols for remote viewing exercises
export const rvTargets = pgTable("rv_targets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  targetId: text("target_id").notNull().unique(), // Coordinate or unique identifier
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // geographic, object, symbol, structure
  imageUrl: text("image_url"), // For feedback after session
  correctElements: jsonb("correct_elements").notNull(), // Array of correct descriptive elements
  difficulty: text("difficulty").default("novice"), // novice, intermediate, advanced
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// RV Training Sessions - Tracks individual remote viewing attempts
export const rvSessions = pgTable("rv_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull().unique(),
  userId: varchar("user_id").notNull().references(() => users.id),
  targetId: varchar("target_id").notNull().references(() => rvTargets.id),
  trainingClass: text("training_class").notNull(), // C (novice), B (intermediate), A (double-blind)
  sessionType: text("session_type").notNull(), // training, operational
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  durationSeconds: integer("duration_seconds"),
  currentStage: integer("current_stage").default(1), // 1-6 based on six stages of perception
  isComplete: boolean("is_complete").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// RV Perceptions - Individual perceptions/responses during a session
export const rvPerceptions = pgTable("rv_perceptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  perceptionId: text("perception_id").notNull().unique(),
  sessionId: varchar("session_id").notNull().references(() => rvSessions.id),
  perceptionText: text("perception_text").notNull(), // Raw perception data
  perceptionType: text("perception_type").notNull(), // gestalt, sensory, dimension, quantitative, qualitative, analytical
  stage: integer("stage").notNull(), // 1-6
  feedback: text("feedback"), // C, PC, N, S (for Class C training)
  timestamp: timestamp("timestamp").defaultNow(),
  responseTimeMs: integer("response_time_ms"), // Quick-reaction timing
});

// RV Progress Tracking - User progression through training classes
export const rvProgress = pgTable("rv_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  currentClass: text("current_class").default("C"), // C, B, A
  classCAccuracy: integer("class_c_accuracy").default(0), // Percentage 0-100
  classCSessionsCompleted: integer("class_c_sessions_completed").default(0),
  classBAccuracy: integer("class_b_accuracy").default(0),
  classBSessionsCompleted: integer("class_b_sessions_completed").default(0),
  classAAccuracy: integer("class_a_accuracy").default(0),
  classASessionsCompleted: integer("class_a_sessions_completed").default(0),
  highestStageReached: integer("highest_stage_reached").default(1), // 1-6
  totalSessions: integer("total_sessions").default(0),
  totalAccuratePerceptions: integer("total_accurate_perceptions").default(0),
  lastSessionAt: timestamp("last_session_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations - simplified for tier-based access only
export const usersRelations = relations(users, ({ many, one }) => ({
  // RV Training Relations
  rvSessions: many(rvSessions),
  rvProgress: one(rvProgress),
}));

export const dbDocumentsRelations = relations(dbDocuments, ({ one }) => ({
  // No direct user relation - access controlled by tier level
}));

export const rvTargetsRelations = relations(rvTargets, ({ many }) => ({
  sessions: many(rvSessions),
}));

export const rvSessionsRelations = relations(rvSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [rvSessions.userId],
    references: [users.id],
  }),
  target: one(rvTargets, {
    fields: [rvSessions.targetId],
    references: [rvTargets.id],
  }),
  perceptions: many(rvPerceptions),
}));

export const rvPerceptionsRelations = relations(rvPerceptions, ({ one }) => ({
  session: one(rvSessions, {
    fields: [rvPerceptions.sessionId],
    references: [rvSessions.id],
  }),
}));

export const rvProgressRelations = relations(rvProgress, ({ one }) => ({
  user: one(users, {
    fields: [rvProgress.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
  discordId: true,
  discordUsername: true,
  discordAvatar: true,
  discordVerified: true,
  auth0Id: true,
  auth0Username: true,
  auth0Avatar: true,
  isActive: true,
  isAdmin: true,
});

export const insertDbDocumentSchema = createInsertSchema(dbDocuments).omit({
  id: true,
  createdAt: true,
  isActive: true,
});

export const insertPasswordResetTokenSchema = createInsertSchema(passwordResetTokens).omit({
  id: true,
  createdAt: true,
  isUsed: true,
});

export const insertRvTargetSchema = createInsertSchema(rvTargets).omit({
  id: true,
  createdAt: true,
  isActive: true,
});

export const insertRvSessionSchema = createInsertSchema(rvSessions).omit({
  id: true,
  createdAt: true,
  startedAt: true,
});

export const insertRvPerceptionSchema = createInsertSchema(rvPerceptions).omit({
  id: true,
  timestamp: true,
});

export const insertRvProgressSchema = createInsertSchema(rvProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDbDocument = z.infer<typeof insertDbDocumentSchema>;
export type DbDocument = typeof dbDocuments.$inferSelect;
export type InsertPasswordResetToken = z.infer<typeof insertPasswordResetTokenSchema>;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;

export type InsertRvTarget = z.infer<typeof insertRvTargetSchema>;
export type RvTarget = typeof rvTargets.$inferSelect;
export type InsertRvSession = z.infer<typeof insertRvSessionSchema>;
export type RvSession = typeof rvSessions.$inferSelect;
export type InsertRvPerception = z.infer<typeof insertRvPerceptionSchema>;
export type RvPerception = typeof rvPerceptions.$inferSelect;
export type InsertRvProgress = z.infer<typeof insertRvProgressSchema>;
export type RvProgress = typeof rvProgress.$inferSelect;
