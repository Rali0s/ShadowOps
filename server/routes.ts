import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { randomBytes } from "crypto";
import {
  demoUser,
  demoResearchDocuments,
  demoRvTargets,
  type DemoResearchDocument,
  type DemoRvTarget,
  type TierLevel,
  type RvDifficulty,
} from "./demo-data";

const tierOrder: TierLevel[] = ["none", "alpha", "beta", "theta", "gamma"];

const accessibleTiers = (tier: TierLevel): TierLevel[] => {
  const index = tierOrder.indexOf(tier);
  if (index === -1) {
    return ["none"];
  }
  return tierOrder.slice(0, index + 1);
};

interface RvSessionRecord {
  sessionId: string;
  userId: string;
  targetId: string;
  trainingClass: "C" | "B" | "A";
  sessionType: "training";
  startedAt: Date;
  completedAt?: Date;
  durationSeconds?: number;
  currentStage: number;
  isComplete: boolean;
}

interface RvPerceptionRecord {
  perceptionId: string;
  sessionId: string;
  perceptionText: string;
  perceptionType: string;
  stage: number;
  responseTimeMs?: number;
  feedback?: "C" | "PC" | "N" | "S";
  timestamp: Date;
}

interface RvProgressRecord {
  userId: string;
  currentClass: "C" | "B" | "A";
  classCAccuracy: number;
  classCSessionsCompleted: number;
  classBAccuracy: number;
  classBSessionsCompleted: number;
  classAAccuracy: number;
  classASessionsCompleted: number;
  totalSessions: number;
  totalAccuratePerceptions: number;
  highestStageReached: number;
  lastSessionAt: Date | null;
}

const DEMO_USER_ID = demoUser.id;

const rvSessions = new Map<string, RvSessionRecord>();
const rvPerceptions = new Map<string, RvPerceptionRecord[]>();

const baseProgress: RvProgressRecord = {
  userId: DEMO_USER_ID,
  currentClass: "C",
  classCAccuracy: 0,
  classCSessionsCompleted: 0,
  classBAccuracy: 0,
  classBSessionsCompleted: 0,
  classAAccuracy: 0,
  classASessionsCompleted: 0,
  totalSessions: 0,
  totalAccuratePerceptions: 0,
  highestStageReached: 1,
  lastSessionAt: null,
};

let rvProgress: RvProgressRecord = { ...baseProgress };

const pickTarget = (difficulty?: string): DemoRvTarget | undefined => {
  if (!difficulty) {
    return demoRvTargets[Math.floor(Math.random() * demoRvTargets.length)];
  }

  const filtered = demoRvTargets.filter((target) => target.difficulty === difficulty);
  if (filtered.length === 0) {
    return demoRvTargets[Math.floor(Math.random() * demoRvTargets.length)];
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
};

const filterDocuments = (
  docs: DemoResearchDocument[],
  options: { category?: string; tag?: string; accessLevel?: string; search?: string },
) => {
  const { category, tag, accessLevel, search } = options;

  const userTier: TierLevel = tierOrder.includes((accessLevel as TierLevel) ?? "none")
    ? (accessLevel as TierLevel)
    : "none";
  const allowedTiers = accessibleTiers(userTier);

  let result = docs.filter((doc) => allowedTiers.includes(doc.accessLevel));

  if (category) {
    result = result.filter((doc) => doc.category === category);
  }

  if (tag) {
    result = result.filter((doc) => doc.tags.includes(tag));
  }

  if (search) {
    const lowered = search.toLowerCase();
    result = result.filter((doc) =>
      doc.title.toLowerCase().includes(lowered) ||
      doc.summary.toLowerCase().includes(lowered) ||
      doc.content.toLowerCase().includes(lowered)
    );
  }

  return result;
};

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/auth/user", (_req, res) => {
    res.json(demoUser);
  });

  app.get("/api/research/categories", (_req, res) => {
    const counts = demoResearchDocuments.reduce<Record<string, number>>((acc, doc) => {
      acc[doc.category] = (acc[doc.category] ?? 0) + 1;
      return acc;
    }, {});

    const categories = Object.entries(counts).map(([category, count]) => ({ category, count }));
    res.json(categories);
  });

  app.get("/api/research/tags", (_req, res) => {
    const tagCounts = demoResearchDocuments.reduce<Record<string, number>>((acc, doc) => {
      for (const tag of doc.tags) {
        acc[tag] = (acc[tag] ?? 0) + 1;
      }
      return acc;
    }, {});

    const tags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);

    res.json(tags);
  });

  app.get("/api/research/documents", (req, res) => {
    const { category, tag, accessLevel, search } = req.query;

    const documents = filterDocuments(demoResearchDocuments, {
      category: typeof category === "string" ? category : undefined,
      tag: typeof tag === "string" ? tag : undefined,
      accessLevel: typeof accessLevel === "string" ? accessLevel : undefined,
      search: typeof search === "string" ? search : undefined,
    });

    res.json(documents);
  });

  app.get("/api/research/documents/:id", (req, res) => {
    const document = demoResearchDocuments.find((doc) => doc.documentId === req.params.id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json(document);
  });

  app.get("/api/rv/progress", (_req, res) => {
    res.json(rvProgress);
  });

  app.post("/api/rv/session/start", (req, res) => {
    const { trainingClass, difficulty }: { trainingClass?: string; difficulty?: RvDifficulty } = req.body ?? {};

    const sessionClass = ["C", "B", "A"].includes(trainingClass ?? "")
      ? (trainingClass as "C" | "B" | "A")
      : rvProgress.currentClass;

    const target = pickTarget(difficulty);
    if (!target) {
      return res.status(404).json({ error: "No training targets available" });
    }

    const sessionId = randomBytes(16).toString("hex");
    const session: RvSessionRecord = {
      sessionId,
      userId: DEMO_USER_ID,
      targetId: target.id,
      trainingClass: sessionClass,
      sessionType: "training",
      startedAt: new Date(),
      currentStage: 1,
      isComplete: false,
    };

    rvSessions.set(sessionId, session);
    rvPerceptions.set(sessionId, []);

    const targetForClient = sessionClass === "C"
      ? target
      : {
          id: target.id,
          targetId: target.targetId,
          category: target.category,
          difficulty: target.difficulty,
        };

    res.json({
      ...session,
      target: targetForClient,
    });
  });

  app.post("/api/rv/session/:sessionId/perception", (req, res) => {
    const { sessionId } = req.params;
    const session = rvSessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const { perceptionText, perceptionType, stage, responseTimeMs } = req.body ?? {};
    if (!perceptionText || typeof perceptionText !== "string") {
      return res.status(400).json({ error: "Perception text is required" });
    }

    const numericStage = typeof stage === "number" ? stage : Number(stage) || 1;

    const perception: RvPerceptionRecord = {
      perceptionId: randomBytes(12).toString("hex"),
      sessionId: session.sessionId,
      perceptionText,
      perceptionType: typeof perceptionType === "string" ? perceptionType : "gestalt",
      stage: numericStage,
      responseTimeMs: typeof responseTimeMs === "number" ? responseTimeMs : undefined,
      timestamp: new Date(),
    };

    const target = demoRvTargets.find((entry) => entry.id === session.targetId);
    if (session.trainingClass === "C" && target) {
      const perceptionLower = perception.perceptionText.toLowerCase();
      const hasMatch = target.correctElements.some((element) =>
        perceptionLower.includes(element.toLowerCase()),
      );
      perception.feedback = hasMatch ? "C" : "N";
    }

    const perceptions = rvPerceptions.get(sessionId);
    if (perceptions) {
      perceptions.push(perception);
    } else {
      rvPerceptions.set(sessionId, [perception]);
    }

    session.currentStage = Math.max(session.currentStage, numericStage);
    res.json(perception);
  });

  app.post("/api/rv/session/:sessionId/complete", (req, res) => {
    const { sessionId } = req.params;
    const session = rvSessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const target = demoRvTargets.find((entry) => entry.id === session.targetId);
    if (!target) {
      return res.status(404).json({ error: "Target not found" });
    }

    const perceptions = rvPerceptions.get(sessionId) ?? [];
    const correctElements = target.correctElements.map((entry) => entry.toLowerCase());
    const accuratePerceptions = perceptions.filter((perception) =>
      correctElements.some((element) => perception.perceptionText.toLowerCase().includes(element)),
    );

    const accuracy = perceptions.length > 0
      ? Math.round((accuratePerceptions.length / perceptions.length) * 100)
      : 0;

    const completedAt = new Date();
    session.completedAt = completedAt;
    session.isComplete = true;
    session.durationSeconds = Math.max(
      0,
      Math.floor((completedAt.getTime() - session.startedAt.getTime()) / 1000),
    );

    rvProgress = {
      ...rvProgress,
      totalSessions: rvProgress.totalSessions + 1,
      totalAccuratePerceptions: rvProgress.totalAccuratePerceptions + accuratePerceptions.length,
      highestStageReached: Math.max(rvProgress.highestStageReached, session.currentStage),
      lastSessionAt: completedAt,
    };

    if (session.trainingClass === "C") {
      rvProgress = {
        ...rvProgress,
        classCSessionsCompleted: rvProgress.classCSessionsCompleted + 1,
        classCAccuracy: accuracy,
      };
    } else if (session.trainingClass === "B") {
      rvProgress = {
        ...rvProgress,
        classBSessionsCompleted: rvProgress.classBSessionsCompleted + 1,
        classBAccuracy: accuracy,
      };
    } else if (session.trainingClass === "A") {
      rvProgress = {
        ...rvProgress,
        classASessionsCompleted: rvProgress.classASessionsCompleted + 1,
        classAAccuracy: accuracy,
      };
    }

    res.json({
      session,
      target,
      perceptions,
      accuracy,
      accuratePerceptions: accuratePerceptions.length,
      totalPerceptions: perceptions.length,
    });
  });

  app.get("/api/rv/sessions", (_req, res) => {
    const sessions = Array.from(rvSessions.values()).sort(
      (a, b) => b.startedAt.getTime() - a.startedAt.getTime(),
    );

    res.json(sessions);
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
