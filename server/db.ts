import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const poolInstance = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const hasDatabase = Boolean(poolInstance);

export const db = hasDatabase
  ? drizzle({ client: poolInstance!, schema })
  : null;

export const pool = poolInstance;
