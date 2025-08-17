import { users, courses, modules, userProgress, certificates, type User, type InsertUser, type Course, type InsertCourse, type Module, type InsertModule, type UserProgress, type InsertUserProgress, type Certificate, type InsertCertificate } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(id: string, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User>;
  updateUserSubscriptionTier(id: string, tier: string): Promise<User>;
  
  getCourses(): Promise<Course[]>;
  getCoursesByTier(tier: string): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  getModulesByCourse(courseId: string): Promise<Module[]>;
  getModule(id: string): Promise<Module | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getCourseProgress(userId: string, courseId: string): Promise<UserProgress[]>;
  updateProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  getUserCertificates(userId: string): Promise<Certificate[]>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  
  getSystemStats(): Promise<{
    activeUsers: number;
    completedModules: number;
    certificates: number;
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

  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isActive, true));
  }

  async getCoursesByTier(tier: string): Promise<Course[]> {
    const tierHierarchy = { none: 0, recruit: 1, operator: 2, shadow: 3 };
    const userTierLevel = tierHierarchy[tier as keyof typeof tierHierarchy] || 0;
    
    return await db.select().from(courses).where(eq(courses.isActive, true));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db
      .insert(courses)
      .values(course)
      .returning();
    return newCourse;
  }

  async getModulesByCourse(courseId: string): Promise<Module[]> {
    return await db.select().from(modules)
      .where(and(eq(modules.courseId, courseId), eq(modules.isActive, true)))
      .orderBy(modules.order);
  }

  async getModule(id: string): Promise<Module | undefined> {
    const [module] = await db.select().from(modules).where(eq(modules.id, id));
    return module || undefined;
  }

  async createModule(module: InsertModule): Promise<Module> {
    const [newModule] = await db
      .insert(modules)
      .values(module)
      .returning();
    return newModule;
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress)
      .where(eq(userProgress.userId, userId))
      .orderBy(desc(userProgress.createdAt));
  }

  async getCourseProgress(userId: string, courseId: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress)
      .where(and(
        eq(userProgress.userId, userId),
        eq(userProgress.courseId, courseId)
      ));
  }

  async updateProgress(progress: InsertUserProgress): Promise<UserProgress> {
    // Check if progress already exists
    const [existing] = await db.select().from(userProgress)
      .where(and(
        eq(userProgress.userId, progress.userId),
        eq(userProgress.courseId, progress.courseId),
        progress.moduleId ? eq(userProgress.moduleId, progress.moduleId) : eq(userProgress.moduleId, null)
      ));

    if (existing) {
      const [updated] = await db
        .update(userProgress)
        .set({ 
          progress: progress.progress,
          completedAt: progress.progress === 100 ? new Date() : null
        })
        .where(eq(userProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newProgress] = await db
        .insert(userProgress)
        .values(progress)
        .returning();
      return newProgress;
    }
  }

  async getUserCertificates(userId: string): Promise<Certificate[]> {
    return await db.select().from(certificates)
      .where(eq(certificates.userId, userId))
      .orderBy(desc(certificates.issuedAt));
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const [newCertificate] = await db
      .insert(certificates)
      .values(certificate)
      .returning();
    return newCertificate;
  }

  async getSystemStats(): Promise<{
    activeUsers: number;
    completedModules: number;
    certificates: number;
    revenue: number;
  }> {
    const activeUsers = await db.$count(users, eq(users.isActive, true));
    const completedModules = await db.$count(userProgress, eq(userProgress.progress, 100));
    const certificateCount = await db.$count(certificates);
    
    // Mock revenue calculation - would integrate with Stripe in production
    const revenue = activeUsers * 79; // Average revenue per user
    
    return {
      activeUsers,
      completedModules,
      certificates: certificateCount,
      revenue
    };
  }
}

export const storage = new DatabaseStorage();
