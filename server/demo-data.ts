export type TierLevel = "none" | "alpha" | "beta" | "theta" | "gamma";

export interface DemoUser {
  id: string;
  email: string | null;
  subscriptionStatus: "active" | "inactive" | "trial" | "cancelled";
  subscriptionTier: TierLevel;
  discordId: string;
  discordUsername: string;
  discordAvatar: string | null;
  discordVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
}

export const demoUser: DemoUser = {
  id: "demo-user",
  email: null,
  subscriptionStatus: "active",
  subscriptionTier: "gamma",
  discordId: "demo-discord-id",
  discordUsername: "ShadowOpsDemo",
  discordAvatar: null,
  discordVerified: true,
  firstName: "Shadow",
  lastName: "Operative",
  profileImageUrl: null,
};

export interface DemoResearchDocument {
  id: string;
  documentId: string;
  title: string;
  content: string;
  classification: string;
  accessLevel: TierLevel;
  fileType: string;
  fileSize: number;
  category: "research" | "operational" | "training" | "general";
  tags: string[];
  author: string;
  summary: string;
  createdAt: Date;
}

const summary = (text: string) => text;

export const demoResearchDocuments: DemoResearchDocument[] = [
  {
    id: "cc-defensive-strategies-001",
    documentId: "cc-defensive-strategies-001",
    title: "Analyzing Citizen Cipher's Defensive Strategies",
    content:
      "A deep dive into the Citizen Cipher curriculum's KSAO framework, bias targeting mechanisms, and verification architectures for defensive proficiency.",
    classification: "RESEARCH ARCHIVE",
    accessLevel: "beta",
    fileType: "md",
    fileSize: 18_432,
    category: "research",
    tags: ["cognitive-biases", "defensive-strategies", "verification"],
    author: "Citizen Cipher Research Team",
    summary: summary(
      "Deep-dive analysis of defensive countermeasures that harden perception, decision-making, and verification workflows.",
    ),
    createdAt: new Date("2024-01-05T00:00:00Z"),
  },
  {
    id: "cc-brand-identity-001",
    documentId: "cc-brand-identity-001",
    title: "Designing Brand Identity and PR Kit for Citizen Cipher",
    content:
      "Strategic launch architecture for external visual identity and public relations kit built on design psychology and zero-trust principles.",
    classification: "OPERATIONAL",
    accessLevel: "beta",
    fileType: "md",
    fileSize: 14_208,
    category: "operational",
    tags: ["branding", "marketing", "psychology"],
    author: "Citizen Cipher Marketing Division",
    summary: summary(
      "Launch playbook covering narrative framing, trust scaffolding, and psychological signaling for the Citizen Cipher platform.",
    ),
    createdAt: new Date("2024-01-10T00:00:00Z"),
  },
  {
    id: "cc-historic-heists-001",
    documentId: "cc-historic-heists-001",
    title: "Historic Heists: Psychological Breakdown",
    content:
      "Forensic analysis of historic deception operations with emphasis on cognitive openings, bias exploitation, and defensive countermeasures.",
    classification: "RESEARCH ARCHIVE",
    accessLevel: "beta",
    fileType: "md",
    fileSize: 20_992,
    category: "research",
    tags: ["case-studies", "social-engineering", "analysis"],
    author: "Citizen Cipher Research Team",
    summary: summary(
      "Forensic profiles of high-yield attacks mapped to defensive countermeasures and verification protocols.",
    ),
    createdAt: new Date("2024-01-18T00:00:00Z"),
  },
  {
    id: "cc-persuasive-heuristics-001",
    documentId: "cc-persuasive-heuristics-001",
    title: "Persuasion, Biases, and Game Theory",
    content:
      "Game-theoretic framework synthesising behavioral economics, social psychology, and persuasion tactics for cognitive hardening.",
    classification: "RESEARCH ARCHIVE",
    accessLevel: "theta",
    fileType: "md",
    fileSize: 17_664,
    category: "research",
    tags: ["persuasion", "game-theory", "heuristics"],
    author: "Citizen Cipher Research Team",
    summary: summary(
      "Extended exploration of bias exploitation patterns with counter-bias conditioning exercises.",
    ),
    createdAt: new Date("2024-01-22T00:00:00Z"),
  },
  {
    id: "cc-podcast-offensive-001",
    documentId: "cc-podcast-offensive-001",
    title: "Podcast Scripting for Offensive Defense",
    content:
      "Voice operations blueprint translating research-grade doctrine into high-fidelity broadcast scripts for cognitive priming.",
    classification: "OPERATIONAL",
    accessLevel: "alpha",
    fileType: "md",
    fileSize: 12_256,
    category: "operational",
    tags: ["audio", "content", "pedagogy"],
    author: "Citizen Cipher Media Division",
    summary: summary(
      "Script architecture for mission briefings, cadence patterns, and mental imagery reinforcement.",
    ),
    createdAt: new Date("2024-01-28T00:00:00Z"),
  },
  {
    id: "cc-project-blueprint-ii-001",
    documentId: "cc-project-blueprint-ii-001",
    title: "Project Blueprint II: Grid Expansion & Systemic Resilience",
    content:
      "Advanced operational security protocols covering cognitive hardening, digital ghost operations, and resilient archive design.",
    classification: "OPERATIONAL - CLASSIFIED",
    accessLevel: "gamma",
    fileType: "md",
    fileSize: 24_576,
    category: "operational",
    tags: ["opsec", "resilience", "shadow-state"],
    author: "Omega Integration Protocol",
    summary: summary(
      "High-tier operational blueprint for maintaining continuity under contested environments.",
    ),
    createdAt: new Date("2024-02-02T00:00:00Z"),
  },
];

export type RvDifficulty = "novice" | "intermediate" | "advanced";
export type RvCategory = "geographic" | "structure" | "object" | "symbol";

export interface DemoRvTarget {
  id: string;
  targetId: string;
  name: string;
  description: string;
  category: RvCategory;
  difficulty: RvDifficulty;
  imageUrl: string | null;
  correctElements: string[];
}

export const demoRvTargets: DemoRvTarget[] = [
  {
    id: "rv-target-001",
    targetId: "2031-ALPHA",
    name: "Washington Monument",
    description: "Tall marble obelisk within a landscaped park and reflecting pool.",
    category: "structure",
    difficulty: "novice",
    imageUrl: null,
    correctElements: ["obelisk", "stone", "tall", "monument", "reflecting pool", "washington"],
  },
  {
    id: "rv-target-002",
    targetId: "5072-BETA",
    name: "Stonehenge",
    description: "Circular arrangement of massive standing stones under open sky.",
    category: "geographic",
    difficulty: "novice",
    imageUrl: null,
    correctElements: ["stones", "circle", "ancient", "field", "monolith"],
  },
  {
    id: "rv-target-003",
    targetId: "7410-THETA",
    name: "Santorini Caldera",
    description: "Cliffside island village overlooking a blue volcanic caldera.",
    category: "geographic",
    difficulty: "intermediate",
    imageUrl: null,
    correctElements: ["water", "cliff", "island", "white buildings", "caldera"],
  },
  {
    id: "rv-target-004",
    targetId: "9923-GAMMA",
    name: "Yin Yang Symbol",
    description: "Black and white circular glyph representing balance and duality.",
    category: "symbol",
    difficulty: "intermediate",
    imageUrl: null,
    correctElements: ["circle", "black", "white", "symbol", "balance"],
  },
  {
    id: "rv-target-005",
    targetId: "8844-PHI",
    name: "International Space Station",
    description: "Modular spacecraft orbiting Earth with solar panel arrays.",
    category: "structure",
    difficulty: "advanced",
    imageUrl: null,
    correctElements: ["space", "station", "solar panels", "orbit", "metal"],
  },
];
