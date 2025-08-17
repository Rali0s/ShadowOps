import { users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(id: string, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User>;
  updateUserSubscriptionTier(id: string, tier: string): Promise<User>;
  
  // Admin functionality - simplified without courses
  getSystemStats(): Promise<{
    activeUsers: number;
    revenue: number;
  }>;
  
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.SessionStore;

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
}

export const storage = new DatabaseStorage();
