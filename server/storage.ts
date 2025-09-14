import { 
  users, 
  dbDocuments, 
  passwordResetTokens,
  type User, 
  type InsertUser, 
  type DbDocument, 
  type InsertDbDocument,
  type PasswordResetToken,
  type InsertPasswordResetToken
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
  
  // Admin functionality - simplified without courses
  getSystemStats(): Promise<{
    activeUsers: number;
    revenue: number;
  }>;
  
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
      // Create new user - for Discord-only users, we'll use Discord username as both username and email if no email provided
      const userEmail = email || `${discordUsername}@discord.local`;
      const username = discordUsername || `discord_${discordId}`;
      
      const [user] = await db
        .insert(users)
        .values({
          username,
          email: userEmail,
          password: 'discord_oauth', // Placeholder password for Discord users
          discordId,
          discordUsername,
          discordAvatar,
          discordVerified,
          subscriptionTier: discordVerified ? 'beta' : 'none' // Auto-grant beta if Discord verified
        })
        .returning();
      
      return user;
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
}

export const storage = new DatabaseStorage();
