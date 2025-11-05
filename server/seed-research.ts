import { db } from "./db";
import { dbDocuments } from "@shared/schema";
import * as fs from "fs";
import * as path from "path";
import mammoth from "mammoth";

const researchDocuments = [
  {
    documentId: "cc-defensive-strategies-001",
    title: "Analyzing Citizen Cipher's Defensive Strategies",
    classification: "RESEARCH ARCHIVE",
    accessLevel: "beta",
    category: "research",
    tags: ["cognitive-biases", "KSAO", "defensive-strategies", "verification-artifacts", "social-engineering"],
    author: "Citizen Cipher Research Team",
    summary: "Deep-dive analysis of the Citizen Cipher curriculum's PHD-Level KSAO framework, bias targeting mechanisms, and verification architectures for defensive proficiency.",
    filePath: "attached_assets/Analyzing Citizen Cipher's Defensive Strategies_1762343273892.docx"
  },
  {
    documentId: "cc-brand-identity-001",
    title: "Designing Brand Identity and PR Kit for Citizen Cipher",
    classification: "OPERATIONAL",
    accessLevel: "beta",
    category: "operational",
    tags: ["branding", "marketing", "PR", "visual-identity", "zero-trust-architecture"],
    author: "Citizen Cipher Marketing Division",
    summary: "Strategic launch architecture for external visual identity and Public Relations Launch Kit, establishing defensible trust and authority through design psychology.",
    filePath: "attached_assets/Designing Brand Identity and PR Kit_1762343273892.docx"
  },
  {
    documentId: "cc-historic-heists-001",
    title: "Historic Heists: Psychological Breakdown",
    classification: "RESEARCH ARCHIVE",
    accessLevel: "beta",
    category: "research",
    tags: ["case-studies", "social-engineering", "cognitive-biases", "KSAO-isolation", "fraud-analysis"],
    author: "Citizen Cipher Research Team",
    summary: "Forensic analysis of high-yield attack vectors through historic cases of heist and fraud, mapping criminal social engineering to defensive KSAO countermeasures.",
    filePath: "attached_assets/Historic Heists Psychological Breakdown_1762343273892.docx"
  },
  {
    documentId: "cc-persuasion-game-theory-001",
    title: "Persuasion, Bias, Heuristics, and Game Theory",
    classification: "RESEARCH ARCHIVE",
    accessLevel: "beta",
    category: "research",
    tags: ["persuasion", "game-theory", "heuristics", "cognitive-biases", "behavioral-economics"],
    author: "Citizen Cipher Research Team",
    summary: "Game-theoretic framework for persuasive schema and behavioral design, synthesizing social psychology, behavioral economics, and strategic manipulation mechanisms.",
    filePath: "attached_assets/Persuasion_ Bias, Heuristics, Game Theory__1762343273892.docx"
  },
  {
    documentId: "cc-podcast-scripting-001",
    title: "Podcast Scripting for Offensive Defense",
    classification: "OPERATIONAL",
    accessLevel: "beta",
    category: "operational",
    tags: ["audio-strategy", "content-production", "pedagogical-framework", "KSAO-translation"],
    author: "Citizen Cipher Media Division",
    summary: "Strategic architecture for the Citizen Cipher podcast series as high-fidelity gateway to PHD-Level curriculum, including voice execution modality and KSAO translation protocols.",
    filePath: "attached_assets/Podcast Scripting for Offensive Defense_1762343273892.docx"
  },
  {
    documentId: "cc-project-blueprint-ii-001",
    title: "Project Blueprint II: Grid Expansion & Systemic Resilience",
    classification: "OPERATIONAL - CLASSIFIED",
    accessLevel: "gamma",
    category: "operational",
    tags: ["OpSec", "grid-expansion", "resilience", "cognitive-hardening", "shadow-state"],
    author: "Omega Integration Protocol",
    summary: "Advanced operational security protocols for sustained systemic resilience, covering cognitive hardening, digital ghost operations, intelligence gathering, and archive protocols.",
    filePath: "attached_assets/Project Blueprint II_1762343273892.docx"
  },
  {
    documentId: "cc-architecture-influence-001",
    title: "The Architecture of Influence: Behavioral Heuristics & Persuasive Design",
    classification: "RESEARCH ARCHIVE",
    accessLevel: "beta",
    category: "research",
    tags: ["behavioral-heuristics", "persuasive-design", "confidence-building", "cognitive-architecture"],
    author: "Citizen Cipher Research Team",
    summary: "Comprehensive framework of behavioral heuristics and cognitive biases, demonstrating strategic application in persuasive interactions and confidence building across domains.",
    filePath: "attached_assets/The Architecture of Influence_ Behavioral Heuristics, Cognitive Biases, and Their Application in Persuasive Design and Confidence Building_1762343273892.docx"
  },
  {
    documentId: "cc-persuasion-biases-game-theory-002",
    title: "Persuasion, Biases, and Game Theory: Extended Analysis",
    classification: "RESEARCH ARCHIVE",
    accessLevel: "beta",
    category: "research",
    tags: ["persuasion", "game-theory", "bounded-rationality", "decision-making", "strategic-interactions"],
    author: "Citizen Cipher Research Team",
    summary: "Extended exploration of behavioral heuristics and cognitive biases in persuasive design, emphasizing game-theoretic frameworks and bounded rationality in strategic contexts.",
    filePath: "attached_assets/Persuasion, Biases, and Game Theory_1762343273892.docx"
  }
];

async function seedResearchDocuments() {
  console.log("🔍 Starting research document seeding...");
  
  for (const doc of researchDocuments) {
    try {
      console.log(`\n📄 Processing: ${doc.title}`);
      
      const fullPath = path.join(process.cwd(), doc.filePath);
      
      if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  File not found: ${fullPath}, skipping...`);
        continue;
      }
      
      const stats = fs.statSync(fullPath);
      const fileType = path.extname(doc.filePath).substring(1);
      
      const existing = await db.query.dbDocuments.findFirst({
        where: (documents, { eq }) => eq(documents.documentId, doc.documentId)
      });
      
      if (existing) {
        console.log(`✓ Document already exists: ${doc.documentId}`);
        continue;
      }
      
      let content = "";
      
      if (fileType === "docx") {
        const result = await mammoth.extractRawText({ path: fullPath });
        content = result.value.substring(0, 100000);
        console.log(`📝 Extracted ${content.length} characters from .docx`);
      } else {
        content = fs.readFileSync(fullPath, 'utf-8').substring(0, 100000);
      }
      
      await db.insert(dbDocuments).values({
        documentId: doc.documentId,
        title: doc.title,
        content: content || doc.summary || "",
        classification: doc.classification,
        accessLevel: doc.accessLevel,
        fileType: fileType,
        fileSize: stats.size,
        category: doc.category,
        tags: doc.tags,
        author: doc.author,
        summary: doc.summary,
        isActive: true
      });
      
      console.log(`✅ Inserted: ${doc.documentId} (${(stats.size / 1024).toFixed(2)} KB)`);
      
    } catch (error) {
      console.error(`❌ Error processing ${doc.title}:`, error);
    }
  }
  
  console.log("\n🎉 Research document seeding complete!");
  process.exit(0);
}

seedResearchDocuments().catch(console.error);
