import { 
  users, 
  dbDocuments, 
  passwordResetTokens,
  rvTargets,
  rvSessions,
  rvPerceptions,
  rvProgress,
  type User, 
  type InsertUser,
  type UpsertUser,
  type DbDocument, 
  type InsertDbDocument,
  type PasswordResetToken,
  type InsertPasswordResetToken,
  type RvTarget,
  type InsertRvTarget,
  type RvSession,
  type InsertRvSession,
  type RvPerception,
  type InsertRvPerception,
  type RvProgress,
  type InsertRvProgress
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, like, or, lt } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByDiscordId(discordId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(id: string, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User>;
  updateUserSubscriptionTier(id: string, tier: string): Promise<User>;
  updateUserPassword(id: string, password: string): Promise<User>;
  updateUserDiscordInfo(id: string, discordId: string, discordUsername: string, discordAvatar: string, discordVerified: boolean): Promise<User>;
  upsertUserByDiscord(discordId: string, discordUsername: string, discordAvatar: string, discordVerified: boolean, email?: string): Promise<User>;
  // Replit Auth
  upsertReplitUser(user: UpsertUser): Promise<User>;
  
  // Password reset functionality
  createPasswordResetToken(token: InsertPasswordResetToken): Promise<PasswordResetToken>;
  getPasswordResetToken(token: string): Promise<PasswordResetToken | undefined>;
  markPasswordResetTokenAsUsed(tokenId: string): Promise<void>;
  cleanupExpiredTokens(): Promise<void>;
  
  // Database documents for terminal file system
  getDbDocuments(accessLevel?: string): Promise<DbDocument[]>;
  getDbDocumentById(documentId: string): Promise<DbDocument | undefined>;
  createDbDocument(document: InsertDbDocument): Promise<DbDocument>;
  searchDbDocuments(searchTerm: string, accessLevel?: string): Promise<DbDocument[]>;
  getDbDocumentsByAccessLevel(accessLevel: string): Promise<DbDocument[]>;
  
  // Research archive methods
  getResearchDocuments(filters: {
    category?: string;
    tag?: string;
    accessLevel?: string;
    search?: string;
  }): Promise<DbDocument[]>;
  getResearchDocumentById(documentId: string): Promise<DbDocument | undefined>;
  getResearchCategories(): Promise<Array<{ category: string; count: number }>>;
  getResearchTags(): Promise<Array<{ tag: string; count: number }>>;
  
  // Admin functionality - simplified without courses
  getSystemStats(): Promise<{
    activeUsers: number;
    revenue: number;
  }>;
  
  // RV Training Module
  getRvTargets(difficulty?: string): Promise<RvTarget[]>;
  getRvTargetById(targetId: string): Promise<RvTarget | undefined>;
  getRandomRvTarget(difficulty?: string): Promise<RvTarget | undefined>;
  createRvTarget(target: InsertRvTarget): Promise<RvTarget>;
  
  getRvProgress(userId: string): Promise<RvProgress | undefined>;
  createRvProgress(progress: InsertRvProgress): Promise<RvProgress>;
  updateRvProgress(userId: string, updates: Partial<InsertRvProgress>): Promise<RvProgress>;
  
  createRvSession(session: InsertRvSession): Promise<RvSession>;
  getRvSession(sessionId: string): Promise<RvSession | undefined>;
  updateRvSession(sessionId: string, updates: Partial<InsertRvSession>): Promise<RvSession>;
  getUserRvSessions(userId: string): Promise<RvSession[]>;
  
  createRvPerception(perception: InsertRvPerception): Promise<RvPerception>;
  getSessionPerceptions(sessionId: string): Promise<RvPerception[]>;
  
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserStripeInfo(id: string, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        stripeCustomerId,
        ...(stripeSubscriptionId && { stripeSubscriptionId })
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateUserSubscriptionTier(id: string, tier: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ subscriptionTier: tier })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateUserPassword(id: string, password: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ password })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getUserByDiscordId(discordId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.discordId, discordId));
    return user || undefined;
  }

  async updateUserDiscordInfo(id: string, discordId: string, discordUsername: string, discordAvatar: string, discordVerified: boolean): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        discordId,
        discordUsername,
        discordAvatar,
        discordVerified
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async upsertReplitUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        subscriptionTier: 'beta', // Auto-grant beta tier for Replit Auth users
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async upsertUserByDiscord(discordId: string, discordUsername: string, discordAvatar: string, discordVerified: boolean, email?: string): Promise<User> {
    // First try to find existing user by Discord ID
    const existingUser = await this.getUserByDiscordId(discordId);
    
    if (existingUser) {
      // Update existing user
      return await this.updateUserDiscordInfo(
        existingUser.id, 
        discordId, 
        discordUsername, 
        discordAvatar, 
        discordVerified
      );
    } else {
      // Create new user - handle potential username/email conflicts
      const userEmail = email || `${discordUsername}@discord.local`;
      let username = discordUsername || `discord_${discordId}`;
      
      // Try to create user, handle unique constraint violations
      let attempts = 0;
      const maxAttempts = 5;
      
      while (attempts < maxAttempts) {
        try {
          const [user] = await db
            .insert(users)
            .values({
              username: attempts === 0 ? username : `${username}_${attempts}`,
              email: attempts === 0 ? userEmail : `${discordId}_${attempts}@discord.local`,
              password: 'discord_oauth', // Placeholder password for Discord users
              discordId,
              discordUsername,
              discordAvatar,
              discordVerified,
              subscriptionTier: discordVerified ? 'beta' : 'none' // Auto-grant beta if Discord verified
            })
            .returning();
          
          return user;
        } catch (error: any) {
          attempts++;
          
          // Check if it's a unique constraint violation
          if (error?.code === '23505' || error?.constraint || error?.message?.includes('unique')) {
            console.log(`🟡 Username/email conflict on attempt ${attempts}, trying with suffix...`);
            
            if (attempts >= maxAttempts) {
              // Last resort: use Discord ID as unique identifier
              const fallbackUsername = `discord_user_${discordId}`;
              const fallbackEmail = `discord_${discordId}@local`;
              
              const [user] = await db
                .insert(users)
                .values({
                  username: fallbackUsername,
                  email: fallbackEmail,
                  password: 'discord_oauth',
                  discordId,
                  discordUsername,
                  discordAvatar,
                  discordVerified,
                  subscriptionTier: discordVerified ? 'beta' : 'none'
                })
                .returning();
              
              return user;
            }
          } else {
            // Re-throw non-constraint errors
            throw error;
          }
        }
      }
      
      throw new Error('Failed to create user after multiple attempts');
    }
  }


  // Password reset functionality
  async createPasswordResetToken(insertToken: InsertPasswordResetToken): Promise<PasswordResetToken> {
    const [token] = await db
      .insert(passwordResetTokens)
      .values(insertToken)
      .returning();
    return token;
  }

  async getPasswordResetToken(token: string): Promise<PasswordResetToken | undefined> {
    const [resetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(and(
        eq(passwordResetTokens.token, token),
        eq(passwordResetTokens.isUsed, false)
      ));
    
    // Check if token exists and is not expired
    if (!resetToken || new Date() > resetToken.expiresAt) {
      return undefined;
    }
    
    return resetToken;
  }

  async markPasswordResetTokenAsUsed(tokenId: string): Promise<void> {
    await db
      .update(passwordResetTokens)
      .set({ isUsed: true })
      .where(eq(passwordResetTokens.id, tokenId));
  }

  async cleanupExpiredTokens(): Promise<void> {
    await db
      .delete(passwordResetTokens)
      .where(lt(passwordResetTokens.expiresAt, new Date()));
  }

  // Course system removed - platform now uses tier-based access only

  async getSystemStats(): Promise<{
    activeUsers: number;
    revenue: number;
  }> {
    const activeUsers = await db.select().from(users).where(eq(users.isActive, true));
    
    // Mock revenue calculation - would integrate with Stripe in production
    const revenue = activeUsers.length * 79; // Average revenue per user
    
    return {
      activeUsers: activeUsers.length,
      revenue
    };
  }

  // Database document methods for terminal file system
  async getDbDocuments(accessLevel?: string): Promise<DbDocument[]> {
    let query = db.select().from(dbDocuments).where(eq(dbDocuments.isActive, true));
    
    if (accessLevel) {
      // Return documents at or below the user's access level
      const tierHierarchy = ["none", "recruit", "operative", "operator", "shadow"];
      const userTierIndex = tierHierarchy.indexOf(accessLevel);
      const allowedTiers = tierHierarchy.slice(0, userTierIndex + 1);
      
      return await query.then(docs => 
        docs.filter(doc => allowedTiers.includes(doc.accessLevel))
      );
    }
    
    return await query;
  }

  async getDbDocumentById(documentId: string): Promise<DbDocument | undefined> {
    const [document] = await db
      .select()
      .from(dbDocuments)
      .where(and(
        eq(dbDocuments.documentId, documentId),
        eq(dbDocuments.isActive, true)
      ));
    return document || undefined;
  }

  async createDbDocument(insertDocument: InsertDbDocument): Promise<DbDocument> {
    const [document] = await db
      .insert(dbDocuments)
      .values(insertDocument)
      .returning();
    return document;
  }

  async searchDbDocuments(searchTerm: string, accessLevel?: string): Promise<DbDocument[]> {
    let query = db
      .select()
      .from(dbDocuments)
      .where(and(
        eq(dbDocuments.isActive, true),
        or(
          like(dbDocuments.title, `%${searchTerm}%`),
          like(dbDocuments.content, `%${searchTerm}%`)
        )
      ));

    const results = await query;
    
    if (accessLevel) {
      const tierHierarchy = ["none", "recruit", "operative", "operator", "shadow"];
      const userTierIndex = tierHierarchy.indexOf(accessLevel);
      const allowedTiers = tierHierarchy.slice(0, userTierIndex + 1);
      
      return results.filter(doc => allowedTiers.includes(doc.accessLevel));
    }
    
    return results;
  }

  async getDbDocumentsByAccessLevel(accessLevel: string): Promise<DbDocument[]> {
    return await db
      .select()
      .from(dbDocuments)
      .where(and(
        eq(dbDocuments.accessLevel, accessLevel),
        eq(dbDocuments.isActive, true)
      ));
  }

  async getResearchDocuments(filters: {
    category?: string;
    tag?: string;
    accessLevel?: string;
    search?: string;
  }): Promise<DbDocument[]> {
    const { sql: rawSql } = await import('drizzle-orm');
    
    let query = db.select().from(dbDocuments).where(eq(dbDocuments.isActive, true));
    const docs = await query;
    
    return docs.filter(doc => {
      if (filters.category && doc.category !== filters.category) return false;
      if (filters.tag && doc.tags && !doc.tags.includes(filters.tag)) return false;
      if (filters.accessLevel) {
        const tierHierarchy = ["none", "alpha", "beta", "theta", "gamma"];
        const userTierIndex = tierHierarchy.indexOf(filters.accessLevel);
        const docTierIndex = tierHierarchy.indexOf(doc.accessLevel);
        if (docTierIndex > userTierIndex) return false;
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          doc.title.toLowerCase().includes(searchLower) ||
          doc.content.toLowerCase().includes(searchLower) ||
          doc.summary?.toLowerCase().includes(searchLower) ||
          (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
      }
      return true;
    });
  }

  async getResearchDocumentById(documentId: string): Promise<DbDocument | undefined> {
    const [document] = await db
      .select()
      .from(dbDocuments)
      .where(and(
        eq(dbDocuments.documentId, documentId),
        eq(dbDocuments.isActive, true)
      ));
    return document || undefined;
  }

  async getResearchCategories(): Promise<Array<{ category: string; count: number }>> {
    const docs = await db.select().from(dbDocuments).where(eq(dbDocuments.isActive, true));
    
    const categoryCounts = docs.reduce((acc, doc) => {
      const category = doc.category || 'general';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count
    }));
  }

  async getResearchTags(): Promise<Array<{ tag: string; count: number }>> {
    const docs = await db.select().from(dbDocuments).where(eq(dbDocuments.isActive, true));
    
    const tagCounts = docs.reduce((acc, doc) => {
      if (doc.tags) {
        doc.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }

  // RV Training Module Implementation
  async getRvTargets(difficulty?: string): Promise<RvTarget[]> {
    if (difficulty) {
      return await db.select().from(rvTargets).where(
        and(
          eq(rvTargets.difficulty, difficulty),
          eq(rvTargets.isActive, true)
        )
      );
    }
    return await db.select().from(rvTargets).where(eq(rvTargets.isActive, true));
  }

  async getRvTargetById(targetId: string): Promise<RvTarget | undefined> {
    const [target] = await db.select().from(rvTargets).where(
      and(
        eq(rvTargets.id, targetId),
        eq(rvTargets.isActive, true)
      )
    );
    return target || undefined;
  }

  async getRandomRvTarget(difficulty?: string): Promise<RvTarget | undefined> {
    const { sql: rawSql } = await import('drizzle-orm');
    let query = db.select().from(rvTargets).where(eq(rvTargets.isActive, true));
    
    if (difficulty) {
      const targets = await db.select().from(rvTargets).where(
        and(
          eq(rvTargets.difficulty, difficulty),
          eq(rvTargets.isActive, true)
        )
      );
      if (targets.length === 0) return undefined;
      return targets[Math.floor(Math.random() * targets.length)];
    }
    
    const targets = await query;
    if (targets.length === 0) return undefined;
    return targets[Math.floor(Math.random() * targets.length)];
  }

  async createRvTarget(target: InsertRvTarget): Promise<RvTarget> {
    const [newTarget] = await db.insert(rvTargets).values(target).returning();
    return newTarget;
  }

  async getRvProgress(userId: string): Promise<RvProgress | undefined> {
    const [progress] = await db.select().from(rvProgress).where(eq(rvProgress.userId, userId));
    return progress || undefined;
  }

  async createRvProgress(progress: InsertRvProgress): Promise<RvProgress> {
    const [newProgress] = await db.insert(rvProgress).values(progress).returning();
    return newProgress;
  }

  async updateRvProgress(userId: string, updates: Partial<InsertRvProgress>): Promise<RvProgress> {
    const [updated] = await db
      .update(rvProgress)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(rvProgress.userId, userId))
      .returning();
    return updated;
  }

  async createRvSession(session: InsertRvSession): Promise<RvSession> {
    const [newSession] = await db.insert(rvSessions).values(session).returning();
    return newSession;
  }

  async getRvSession(sessionId: string): Promise<RvSession | undefined> {
    const [session] = await db.select().from(rvSessions).where(eq(rvSessions.sessionId, sessionId));
    return session || undefined;
  }

  async updateRvSession(sessionId: string, updates: Partial<InsertRvSession>): Promise<RvSession> {
    const [updated] = await db
      .update(rvSessions)
      .set(updates)
      .where(eq(rvSessions.sessionId, sessionId))
      .returning();
    return updated;
  }

  async getUserRvSessions(userId: string): Promise<RvSession[]> {
    return await db.select().from(rvSessions)
      .where(eq(rvSessions.userId, userId))
      .orderBy(desc(rvSessions.createdAt));
  }

  async createRvPerception(perception: InsertRvPerception): Promise<RvPerception> {
    const [newPerception] = await db.insert(rvPerceptions).values(perception).returning();
    return newPerception;
  }

  async getSessionPerceptions(sessionId: string): Promise<RvPerception[]> {
    return await db.select().from(rvPerceptions)
      .where(eq(rvPerceptions.sessionId, sessionId))
      .orderBy(desc(rvPerceptions.timestamp));
  }
}

export const storage = new DatabaseStorage();
