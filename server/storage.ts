import session from "express-session";
import connectPg from "connect-pg-simple";
import { nanoid } from "nanoid";
import {
  users,
  dbDocuments,
  passwordResetTokens,
  type User,
  type InsertUser,
  type DbDocument,
  type InsertDbDocument,
  type PasswordResetToken,
  type InsertPasswordResetToken,
} from "@shared/schema";
import { and, eq, like, lt, or } from "drizzle-orm";

import { db, hasDatabase, pool } from "./db";
import { logger } from "./logger";

const PostgresSessionStore = connectPg(session);
const tierHierarchy = ["none", "recruit", "operative", "operator", "shadow"];

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByDiscordId(discordId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(id: string, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User>;
  updateUserSubscriptionTier(id: string, tier: string): Promise<User>;
  updateUserPassword(id: string, password: string): Promise<User>;
  updateUserDiscordInfo(
    id: string,
    discordId: string,
    discordUsername: string,
    discordAvatar: string,
    discordVerified: boolean,
  ): Promise<User>;
  upsertUserByDiscord(
    discordId: string,
    discordUsername: string,
    discordAvatar: string,
    discordVerified: boolean,
    email?: string,
  ): Promise<User>;

  createPasswordResetToken(token: InsertPasswordResetToken): Promise<PasswordResetToken>;
  getPasswordResetToken(token: string): Promise<PasswordResetToken | undefined>;
  markPasswordResetTokenAsUsed(tokenId: string): Promise<void>;
  cleanupExpiredTokens(): Promise<void>;

  getDbDocuments(accessLevel?: string): Promise<DbDocument[]>;
  getDbDocumentById(documentId: string): Promise<DbDocument | undefined>;
  createDbDocument(document: InsertDbDocument): Promise<DbDocument>;
  searchDbDocuments(searchTerm: string, accessLevel?: string): Promise<DbDocument[]>;
  getDbDocumentsByAccessLevel(accessLevel: string): Promise<DbDocument[]>;

  getSystemStats(): Promise<{ activeUsers: number; revenue: number }>;

  sessionStore: session.Store;
}

type DatabaseClient = NonNullable<typeof db>;
type PoolClient = NonNullable<typeof pool>;

class DatabaseStorage implements IStorage {
  public readonly sessionStore: session.Store;

  constructor(private readonly database: DatabaseClient, pool: PoolClient) {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.database.select().from(users).where(eq(users.id, id));
    return user ?? undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.database.select().from(users).where(eq(users.username, username));
    return user ?? undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.database.select().from(users).where(eq(users.email, email));
    return user ?? undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.database.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserStripeInfo(
    id: string,
    stripeCustomerId: string,
    stripeSubscriptionId?: string,
  ): Promise<User> {
    const [user] = await this.database
      .update(users)
      .set({
        stripeCustomerId,
        ...(stripeSubscriptionId && { stripeSubscriptionId }),
      })
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  async updateUserSubscriptionTier(id: string, tier: string): Promise<User> {
    const [user] = await this.database
      .update(users)
      .set({ subscriptionTier: tier })
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  async updateUserPassword(id: string, password: string): Promise<User> {
    const [user] = await this.database
      .update(users)
      .set({ password })
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  async getUserByDiscordId(discordId: string): Promise<User | undefined> {
    const [user] = await this.database.select().from(users).where(eq(users.discordId, discordId));
    return user ?? undefined;
  }

  async updateUserDiscordInfo(
    id: string,
    discordId: string,
    discordUsername: string,
    discordAvatar: string,
    discordVerified: boolean,
  ): Promise<User> {
    const [user] = await this.database
      .update(users)
      .set({
        discordId,
        discordUsername,
        discordAvatar,
        discordVerified,
      })
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  async upsertUserByDiscord(
    discordId: string,
    discordUsername: string,
    discordAvatar: string,
    discordVerified: boolean,
    email?: string,
  ): Promise<User> {
    const existingUser = await this.getUserByDiscordId(discordId);

    if (existingUser) {
      return this.updateUserDiscordInfo(
        existingUser.id,
        discordId,
        discordUsername,
        discordAvatar,
        discordVerified,
      );
    }

    const userEmail = email || `${discordUsername || `discord_${discordId}`}@discord.local`;
    let username = discordUsername || `discord_${discordId}`;

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      try {
        const [user] = await this.database
          .insert(users)
          .values({
            username: attempts === 0 ? username : `${username}_${attempts}`,
            email: attempts === 0 ? userEmail : `${discordId}_${attempts}@discord.local`,
            password: "discord_oauth",
            discordId,
            discordUsername,
            discordAvatar,
            discordVerified,
            subscriptionTier: discordVerified ? "beta" : "none",
          })
          .returning();

        return user;
      } catch (error: any) {
        attempts += 1;

        if (error?.code === "23505" || error?.constraint || error?.message?.includes("unique")) {
          if (attempts >= maxAttempts) {
            const [user] = await this.database
              .insert(users)
              .values({
                username: `discord_user_${discordId}`,
                email: `discord_${discordId}@local`,
                password: "discord_oauth",
                discordId,
                discordUsername,
                discordAvatar,
                discordVerified,
                subscriptionTier: discordVerified ? "beta" : "none",
              })
              .returning();

            return user;
          }
        } else {
          throw error;
        }
      }
    }

    throw new Error("Failed to create user after multiple attempts");
  }

  async createPasswordResetToken(insertToken: InsertPasswordResetToken): Promise<PasswordResetToken> {
    const [token] = await this.database
      .insert(passwordResetTokens)
      .values(insertToken)
      .returning();

    return token;
  }

  async getPasswordResetToken(token: string): Promise<PasswordResetToken | undefined> {
    const [resetToken] = await this.database
      .select()
      .from(passwordResetTokens)
      .where(and(eq(passwordResetTokens.token, token), eq(passwordResetTokens.isUsed, false)));

    if (!resetToken || new Date() > resetToken.expiresAt) {
      return undefined;
    }

    return resetToken;
  }

  async markPasswordResetTokenAsUsed(tokenId: string): Promise<void> {
    await this.database
      .update(passwordResetTokens)
      .set({ isUsed: true })
      .where(eq(passwordResetTokens.id, tokenId));
  }

  async cleanupExpiredTokens(): Promise<void> {
    await this.database
      .delete(passwordResetTokens)
      .where(lt(passwordResetTokens.expiresAt, new Date()));
  }

  async getSystemStats(): Promise<{ activeUsers: number; revenue: number }> {
    const activeUsers = await this.database.select().from(users).where(eq(users.isActive, true));
    const revenue = activeUsers.length * 79;

    return {
      activeUsers: activeUsers.length,
      revenue,
    };
  }

  async getDbDocuments(accessLevel?: string): Promise<DbDocument[]> {
    const docs = await this.database
      .select()
      .from(dbDocuments)
      .where(eq(dbDocuments.isActive, true));

    if (!accessLevel) {
      return docs;
    }

    const userTierIndex = tierHierarchy.indexOf(accessLevel);
    const allowedTiers = tierHierarchy.slice(0, userTierIndex + 1);

    return docs.filter(doc => allowedTiers.includes(doc.accessLevel));
  }

  async getDbDocumentById(documentId: string): Promise<DbDocument | undefined> {
    const [document] = await this.database
      .select()
      .from(dbDocuments)
      .where(and(eq(dbDocuments.documentId, documentId), eq(dbDocuments.isActive, true)));

    return document ?? undefined;
  }

  async createDbDocument(insertDocument: InsertDbDocument): Promise<DbDocument> {
    const [document] = await this.database.insert(dbDocuments).values(insertDocument).returning();
    return document;
  }

  async searchDbDocuments(searchTerm: string, accessLevel?: string): Promise<DbDocument[]> {
    const results = await this.database
      .select()
      .from(dbDocuments)
      .where(
        and(
          eq(dbDocuments.isActive, true),
          or(
            like(dbDocuments.title, `%${searchTerm}%`),
            like(dbDocuments.content, `%${searchTerm}%`),
          ),
        ),
      );

    if (!accessLevel) {
      return results;
    }

    const userTierIndex = tierHierarchy.indexOf(accessLevel);
    const allowedTiers = tierHierarchy.slice(0, userTierIndex + 1);

    return results.filter(doc => allowedTiers.includes(doc.accessLevel));
  }

  async getDbDocumentsByAccessLevel(accessLevel: string): Promise<DbDocument[]> {
    return this.database
      .select()
      .from(dbDocuments)
      .where(and(eq(dbDocuments.accessLevel, accessLevel), eq(dbDocuments.isActive, true)));
  }
}

class InMemoryStorage implements IStorage {
  public readonly sessionStore: session.Store;
  private readonly users = new Map<string, User>();
  private readonly documents = new Map<string, DbDocument>();
  private readonly passwordTokens = new Map<string, PasswordResetToken>();

  constructor() {
    this.sessionStore = new session.MemoryStore();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of Array.from(this.users.values())) {
      if (user.username === username) return user;
    }
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of Array.from(this.users.values())) {
      if (user.email === email) return user;
    }
    return undefined;
  }

  async getUserByDiscordId(discordId: string): Promise<User | undefined> {
    for (const user of Array.from(this.users.values())) {
      if (user.discordId === discordId) return user;
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const subscriptionTier = (insertUser as Partial<User>).subscriptionTier ?? "none";

    const user: User = {
      id: nanoid(),
      username: insertUser.username,
      email: insertUser.email,
      password: insertUser.password,
      subscriptionTier,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      discordId: null,
      discordUsername: null,
      discordAvatar: null,
      discordVerified: false,
      isActive: true,
      isAdmin: false,
      createdAt: new Date(),
    };

    this.users.set(user.id, user);
    return user;
  }

  async updateUserStripeInfo(
    id: string,
    stripeCustomerId: string,
    stripeSubscriptionId?: string,
  ): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }

    user.stripeCustomerId = stripeCustomerId;
    if (stripeSubscriptionId) {
      user.stripeSubscriptionId = stripeSubscriptionId;
    }

    this.users.set(id, user);
    return user;
  }

  async updateUserSubscriptionTier(id: string, tier: string): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }

    user.subscriptionTier = tier;
    this.users.set(id, user);
    return user;
  }

  async updateUserPassword(id: string, password: string): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }

    user.password = password;
    this.users.set(id, user);
    return user;
  }

  async updateUserDiscordInfo(
    id: string,
    discordId: string,
    discordUsername: string,
    discordAvatar: string,
    discordVerified: boolean,
  ): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }

    user.discordId = discordId;
    user.discordUsername = discordUsername;
    user.discordAvatar = discordAvatar;
    user.discordVerified = discordVerified;

    this.users.set(id, user);
    return user;
  }

  async upsertUserByDiscord(
    discordId: string,
    discordUsername: string,
    discordAvatar: string,
    discordVerified: boolean,
    email?: string,
  ): Promise<User> {
    const existingUser = await this.getUserByDiscordId(discordId);
    if (existingUser) {
      return this.updateUserDiscordInfo(
        existingUser.id,
        discordId,
        discordUsername,
        discordAvatar,
        discordVerified,
      );
    }

    const username = discordUsername || `discord_${discordId}`;
    const userEmail = email || `${username}@discord.local`;

    const user: User = {
      id: nanoid(),
      username,
      email: userEmail,
      password: "discord_oauth",
      subscriptionTier: discordVerified ? "beta" : "none",
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      discordId,
      discordUsername,
      discordAvatar,
      discordVerified,
      isActive: true,
      isAdmin: false,
      createdAt: new Date(),
    };

    this.users.set(user.id, user);
    return user;
  }

  async createPasswordResetToken(insertToken: InsertPasswordResetToken): Promise<PasswordResetToken> {
    const token: PasswordResetToken = {
      id: nanoid(),
      token: insertToken.token,
      userId: insertToken.userId,
      expiresAt: insertToken.expiresAt,
      isUsed: false,
      createdAt: new Date(),
    };

    this.passwordTokens.set(token.token, token);
    return token;
  }

  async getPasswordResetToken(token: string): Promise<PasswordResetToken | undefined> {
    const found = this.passwordTokens.get(token);
    if (!found || found.isUsed || new Date() > found.expiresAt) {
      return undefined;
    }

    return found;
  }

  async markPasswordResetTokenAsUsed(tokenId: string): Promise<void> {
    for (const token of Array.from(this.passwordTokens.values())) {
      if (token.id === tokenId) {
        token.isUsed = true;
        this.passwordTokens.set(token.token, token);
        break;
      }
    }
  }

  async cleanupExpiredTokens(): Promise<void> {
    for (const [token, value] of Array.from(this.passwordTokens.entries())) {
      if (value.isUsed || new Date() > value.expiresAt) {
        this.passwordTokens.delete(token);
      }
    }
  }

  async getDbDocuments(accessLevel?: string): Promise<DbDocument[]> {
    const docs = Array.from(this.documents.values()).filter(doc => doc.isActive ?? true);

    if (!accessLevel) {
      return docs;
    }

    const userTierIndex = tierHierarchy.indexOf(accessLevel);
    const allowedTiers = tierHierarchy.slice(0, userTierIndex + 1);
    return docs.filter(doc => allowedTiers.includes(doc.accessLevel));
  }

  async getDbDocumentById(documentId: string): Promise<DbDocument | undefined> {
    for (const doc of Array.from(this.documents.values())) {
      if (doc.documentId === documentId && (doc.isActive ?? true)) {
        return doc;
      }
    }
    return undefined;
  }

  async createDbDocument(insertDocument: InsertDbDocument): Promise<DbDocument> {
    const fileType = (insertDocument as Partial<DbDocument>).fileType ?? "txt";

    const document: DbDocument = {
      id: nanoid(),
      documentId: insertDocument.documentId,
      title: insertDocument.title,
      content: insertDocument.content,
      classification: insertDocument.classification,
      accessLevel: insertDocument.accessLevel,
      fileType,
      fileSize: insertDocument.fileSize,
      isActive: true,
      createdAt: new Date(),
    };

    this.documents.set(document.id, document);
    return document;
  }

  async searchDbDocuments(searchTerm: string, accessLevel?: string): Promise<DbDocument[]> {
    const lowerTerm = searchTerm.toLowerCase();
    const results = (await this.getDbDocuments(accessLevel)).filter(doc =>
      doc.title.toLowerCase().includes(lowerTerm) || doc.content.toLowerCase().includes(lowerTerm),
    );

    return results;
  }

  async getDbDocumentsByAccessLevel(accessLevel: string): Promise<DbDocument[]> {
    const docs = await this.getDbDocuments();
    return docs.filter(doc => doc.accessLevel === accessLevel);
  }

  async getSystemStats(): Promise<{ activeUsers: number; revenue: number }> {
    const activeUsers = Array.from(this.users.values()).filter(user => user.isActive);
    return {
      activeUsers: activeUsers.length,
      revenue: activeUsers.length * 79,
    };
  }
}

function createStorage(): IStorage {
  if (hasDatabase && db && pool) {
    logger.info("Using Postgres-backed storage");
    return new DatabaseStorage(db, pool);
  }

  logger.warn(
    "DATABASE_URL not provided. Falling back to in-memory storage. Data will not persist between restarts.",
  );
  return new InMemoryStorage();
}

export const storage = createStorage();
export const isDatabaseBacked = storage instanceof DatabaseStorage;
