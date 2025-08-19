import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Simple health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "operational",
      mode: "open_access",
      timestamp: new Date().toISOString(),
      brainwaveSystem: "active",
      frequencyBands: ["alpha", "beta", "theta", "gamma"]
    });
  });

  // Mock admin stats for dashboard
  app.get("/api/admin/stats", (req, res) => {
    res.json({
      totalSessions: 1247,
      activeUsers: 89,
      totalFrequencyAnalyses: 5634,
      systemUptime: "99.9%",
      averageSessionLength: "45 minutes",
      popularFrequencies: {
        alpha: 34,
        beta: 28,
        theta: 25,
        gamma: 13
      }
    });
  });

  // Brainwave frequency data endpoint
  app.get("/api/frequencies", (req, res) => {
    res.json([
      {
        id: 1,
        name: "Alpha",
        range: "8-12 Hz",
        description: "Relaxed wakefulness and creative flow state",
        color: "#ff6b6b",
        available: true
      },
      {
        id: 2,
        name: "Beta", 
        range: "12-30 Hz",
        description: "Alert analytical thinking and problem-solving",
        color: "#4ecdc4",
        available: true
      },
      {
        id: 3,
        name: "Theta",
        range: "4-8 Hz", 
        description: "Deep processing and creative insights",
        color: "#45b7d1",
        available: true
      },
      {
        id: 4,
        name: "Gamma",
        range: "30-100+ Hz",
        description: "Peak cognitive performance and consciousness",
        color: "#96ceb4",
        available: true
      }
    ]);
  });

  const httpServer = createServer(app);
  return httpServer;
}