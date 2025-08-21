import { useState, useEffect, useRef } from "react";
import { StatusIndicator, AccessibilitySymbol } from "./terminal-symbols";
import { FrequencyCommandVisualizer } from "./frequency-command-visualizer";

interface EnhancedTerminalProps {}

export function EnhancedTerminal({}: EnhancedTerminalProps = {}) {
  const [output, setOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showFrequencyViz, setShowFrequencyViz] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(10);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    const bootSequence = [
      "[SYSTEM] _Fq Brainwave System v3.0.0 - OPEN ACCESS",
      "[BOOT] Initializing frequency training environment...",
      "[ACCESS] Open Access Mode - All frequencies available",
      "[INFO] Welcome to brainwave frequency training",
      "[FREQ] Alpha (8-12Hz) | Beta (12-30Hz) | Theta (4-8Hz) | Gamma (30-100+Hz)",
      "",
      "Type 'help' to see available commands.",
      ""
    ];
    setOutput(bootSequence);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const addToOutput = (lines: string[]) => {
    setOutput(prev => [...prev, ...lines]);
  };

  const processCommand = (command: string) => {
    const trimmed = command.trim();
    const args = trimmed.split(' ');
    const cmd = args[0].toLowerCase();

    // Add command to output
    addToOutput([`operative@fq_system:~$ ${command}`]);

    switch (cmd) {
      case 'help':
        addToOutput([
          "Available Commands:",
          "  help          - Display this help message",
          "  frequencies   - Show brainwave frequency bands",
          "  alpha         - Access Alpha wave training (8-12 Hz)",
          "  beta          - Access Beta wave training (12-30 Hz)", 
          "  theta         - Access Theta wave training (4-8 Hz)",
          "  gamma         - Access Gamma wave training (30-100+ Hz)",
          "  sacred        - Activate sacred geometry wheel visualization",
          "  geomatry      - Alternative sacred geometry command",
          "  wheel [freq]  - Show frequency wheel at specific Hz",
          "  elliptic      - High-speed elliptical pattern warning mode",
          "  anchor        - Set psychological anchor points",
          "  trigger       - Arm psychological trigger systems", 
          "  tiedown       - Initiate tiedown protocol",
          "  schema [type] - Load psychological schema (A, B, C)",
          "  knot          - Knot-So-lution programming interface",
          "  neural-matrix - Access infiltration archives",
          "  treadstone    - View acquired classified documents",
          "  infiltrate    - Display backstory and mission details",
          "  ksp           - Access Knot Solution Programming dossier",
          "  dossier       - View complete KSP documentation",
          "  classify      - Display classification and risk levels",
          "  status        - Show system status",
          "  clear         - Clear terminal screen",
          "  exit          - Terminate session"
        ]);
        break;

      case 'status':
        addToOutput([
          "System Status:",
          "Access Level: OPEN ACCESS",
          "Available Frequencies: ALL",
          "Session: ACTIVE",
          "Mode: TRAINING READY"
        ]);
        break;

      case 'frequencies':
        addToOutput([
          "Brainwave Frequency Bands - All Available:",
          "",
          "Alpha (8-12 Hz)  - Relaxed wakefulness, creative flow",
          "Beta (12-30 Hz)  - Alert thinking, problem solving", 
          "Theta (4-8 Hz)   - Deep processing, creative insights",
          "Gamma (30-100+Hz)- Peak performance, consciousness",
          "",
          "Use: alpha, beta, theta, or gamma commands to access training"
        ]);
        break;

      case 'alpha':
        addToOutput([
          "═══ ALPHA WAVE TRAINING (8-12 Hz) ═══",
          "",
          "Alpha waves promote relaxed wakefulness and creative flow states.",
          "Perfect for meditation, creative work, and stress reduction.",
          "",
          "Training modules:",
          "• Mindfulness meditation protocols",
          "• Creative visualization exercises", 
          "• Stress reduction techniques",
          "• Flow state induction",
          "",
          "Status: AVAILABLE - Open Access"
        ]);
        break;

      case 'beta':
        addToOutput([
          "═══ BETA WAVE TRAINING (12-30 Hz) ═══",
          "",
          "Beta waves enhance alert thinking and analytical processing.",
          "Ideal for focus, concentration, and problem-solving tasks.",
          "",
          "Training modules:",
          "• Concentration enhancement protocols",
          "• Problem-solving methodologies",
          "• Analytical thinking exercises",
          "• Cognitive performance optimization",
          "",
          "Status: AVAILABLE - Open Access"
        ]);
        break;

      case 'theta':
        addToOutput([
          "═══ THETA WAVE TRAINING (4-8 Hz) ═══",
          "",
          "Theta waves facilitate deep processing and creative insights.",
          "Associated with deep meditation and subconscious access.",
          "",
          "Training modules:",
          "• Deep meditation techniques",
          "• Memory consolidation protocols",
          "• Creative breakthrough exercises",
          "• Subconscious programming methods",
          "",
          "Status: AVAILABLE - Open Access"
        ]);
        break;

      case 'gamma':
        addToOutput([
          "═══ GAMMA WAVE TRAINING (30-100+ Hz) ═══",
          "",
          "Gamma waves represent peak cognitive performance and consciousness.",
          "Associated with heightened awareness and cognitive binding.",
          "",
          "Training modules:",
          "• Peak performance protocols",
          "• Consciousness expansion exercises", 
          "• Cognitive enhancement techniques",
          "• Advanced awareness training",
          "",
          "Status: AVAILABLE - Open Access"
        ]);
        setCurrentFrequency(50);
        setShowFrequencyViz(true);
        break;

      case 'sacred':
      case 'geomatry':
        addToOutput([
          "⚠ ACTIVATING SACRED GEOMETRY WHEEL ⚠",
          "",
          "Initializing 13-circle elliptical pattern...",
          "Complex triangular formations loading...",
          "Cross-sectional shape vectors active...",
          "",
          "WARNING: High-speed rotation with elliptical warning mode enabled",
          "Sacred geometry synchronization with brainwave frequencies active."
        ]);
        setCurrentFrequency(25);
        setShowFrequencyViz(true);
        break;

      case 'wheel':
        const freq = args[1] ? parseFloat(args[1]) : 15;
        if (isNaN(freq) || freq < 1 || freq > 100) {
          addToOutput(["Error: Invalid frequency. Use: wheel [1-100]"]);
        } else {
          addToOutput([
            `Activating frequency wheel at ${freq.toFixed(1)} Hz`,
            "Sacred geometry patterns synchronized to brainwave frequency",
            "13 alternating circles with complex triangular shapes active"
          ]);
          setCurrentFrequency(freq);
          setShowFrequencyViz(true);
        }
        break;

      case 'elliptic':
        addToOutput([
          "🔴 HIGH-SPEED ELLIPTICAL WARNING MODE ACTIVATED 🔴",
          "",
          "Elliptical distortion: 1.2x horizontal, 0.8x vertical",
          "13 circles alternating with complex directional triangles",
          "Cross-sectional broader shapes between intersections",
          "Rotation speed: MAXIMUM",
          "",
          "⚠ WARNING: Intense visual stimulation active ⚠",
          "Self-programming geometry goals will be computed..."
        ]);
        setCurrentFrequency(75);
        setShowFrequencyViz(true);
        break;

      case 'anchor':
        addToOutput([
          "═══ PSYCHOLOGICAL ANCHOR SYSTEM ═══",
          "",
          "Anchor points available:",
          "• Visual dial recall - Internal visualization anchor",
          "• Cisco phone sound - External audio trigger",
          "• Flashlight indicator - Flow state marker",
          "",
          "Setting anchors for schema recall...",
          "Jason Bourne-like trigger system ready.",
          "",
          "Use: anchor [type] to set specific anchor"
        ]);
        break;

      case 'trigger':
        addToOutput([
          "═══ TRIGGER ACTIVATION SYSTEM ═══",
          "",
          "Available triggers:",
          "• DropGate Processing - External schema entrance",
          "• FlowGate Processing - Flow state maintenance",
          "• Exit Protocol - Coo-coo clock timer",
          "• Internal OFF - Prudent state exit",
          "",
          "WARNING: 1-3 external/internal stimuli anchors",
          "Inception point for latent mental schema operation",
          "",
          "Triggers armed and ready for activation."
        ]);
        break;

      case 'tiedown':
        addToOutput([
          "⚠ INITIATING TIEDOWN PROTOCOL ⚠",
          "",
          "Purpose: Prevent cognitive dissonance fully",
          "Process: Debrief and normalize subject back to reality",
          "",
          "Protocol steps:",
          "1. Task completion verification",
          "2. Exit DROP schema activation",
          "3. Grounding in present time and day",
          "4. Time-check and sanity check",
          "",
          "WARNING: Longer flow states = increased dissonance risk",
          "Second person monitoring required for safety.",
          "",
          "Tiedown protocol active - Operation completed."
        ]);
        break;

      case 'schema':
        const schemaType = args[1]?.toUpperCase() || 'A';
        if (!['A', 'B', 'C'].includes(schemaType)) {
          addToOutput(["Error: Invalid schema type. Use: schema [A|B|C]"]);
        } else {
          const schemas: Record<string, string> = {
            'A': 'Theta Level Schema Induction - 1hr duration',
            'B': 'Flow State Operations - 24hr duration', 
            'C': 'Advanced Schema Operations - 1week duration'
          };
          addToOutput([
            `═══ LOADING SCHEMA ${schemaType} ═══`,
            "",
            `${schemas[schemaType]}`,
            "",
            "Schema components:",
            "• Prefabricated mindset patterns",
            "• THETA level induction protocols",
            "• Anchor/trigger integration points",
            "• Exit and tiedown procedures",
            "",
            `Schema ${schemaType} loaded successfully.`,
            "Ready for MK-Ultra methodology implementation."
          ]);
        }
        break;

      case 'knot':
        addToOutput([
          "═══ KNOT-SO-LUTION PROGRAMMING ═══",
          "",
          "⚠ PRODUCT OF A MAD MAN ⚠",
          "",
          "Psychological programming framework active:",
          "",
          "Theory: Ultrasonic sub-conscious suggestion",
          "Method: Pen & paper processing integration",
          "Goal: Jason Bourne-like trigger activation",
          "",
          "Prerequisites validated:",
          "✓ Knowledge of MK-Ultra Project",
          "✓ ECG baseline established",
          "✓ ENDEL sound app configured",
          "✓ Track book and log ready",
          "",
          "WARNING: Magical thinking issues possible",
          "Cognitive dissonance abnormalities may occur",
          "Danger level increases with extended use",
          "",
          "Knot-So-lution framework operational."
        ]);
        break;

      case 'tier':
        addToOutput([
          "Access Level Information:",
          "Current access: OPEN ACCESS",
          "",
          "All brainwave frequency training available:",
          "• Alpha (8-12 Hz) - Relaxed awareness",
          "• Beta (12-30 Hz) - Alert thinking",
          "• Theta (4-8 Hz) - Deep processing", 
          "• Gamma (30-100+ Hz) - Peak performance",
          "",
          "Sacred geometry visualization: ENABLED"
        ]);
        break;

      case 'clear':
        setOutput([]);
        break;

      case 'exit':
        addToOutput([
          "Terminating session...",
          "Connection closed."
        ]);
        break;

      case 'neural-matrix':
        addToOutput([
          "═══ NEURAL MATRIX INFILTRATION ARCHIVES ═══",
          "",
          "⚠ ACCESSING CLASSIFIED DOCUMENTS ⚠",
          "",
          "Infiltration successful through age falsification.",
          "Access gained to pre-public release materials.",
          "",
          "Documents acquired:",
          "• Neural Matrix Psychological Programming Manual",
          "• Treadstone Memory Implantation Protocols", 
          "• Outcome Program Enhancement Documentation",
          "",
          "Classification: FORMERLY TOP SECRET - NOW DECLASSIFIED",
          "Current status: Integrated into civilian training platform",
          "",
          "Navigate to /neural-matrix for full archive access."
        ]);
        break;

      case 'treadstone':
        addToOutput([
          "═══ TREADSTONE MEMORY OPERATIONS ═══",
          "",
          "Deep cover infiltration complete.",
          "Memory manipulation techniques acquired.",
          "",
          "Techniques learned:",
          "• Visual recall anchor implementation",
          "• Flashlight trigger systems", 
          "• Phone-based audio cues (Cisco 90s)",
          "• Internal dial visualization",
          "• Exit sequence protocols",
          "",
          "All military techniques adapted for cognitive enhancement.",
          "Sacred geometry wheel serves as civilian-safe replacement.",
          "",
          "Access full documentation at /neural-matrix"
        ]);
        break;

      case 'infiltrate':
        addToOutput([
          "═══ INFILTRATION MISSION BRIEFING ═══",
          "",
          "SUBJECT: Age falsification and facility penetration",
          "TARGET: Neural Matrix training facility", 
          "OBJECTIVE: Acquire classified programming manuals",
          "",
          "MISSION PHASES:",
          "Phase 1: False documentation created",
          "Phase 2: Facility infiltration successful",
          "Phase 3: Manual acquisition complete",
          "Phase 4: Knowledge integration achieved",
          "",
          "OUTCOME: Military-grade psychological programming",
          "evolved into beneficial civilian cognitive training.",
          "",
          "Mission status: SUCCESS - Full evolution complete",
          "Current platform: _Fq Brainwave Frequency Training"
        ]);
        break;

      case 'ksp':
        addToOutput([
          "🌀 KNOT SOLUTION PROGRAMMING DOSSIER",
          "",
          "⚠ CLASSIFICATION: Internal / Restricted ⚠",
          "⚠ DISCLAIMER: Product of A Mad Man ⚠",
          "",
          "Psychological Conditioning & Brainwave Schema Programming",
          "",
          "SYSTEM OVERVIEW:",
          "• Brainwave entrainment (Alpha, Beta, Theta, Gamma)",
          "• Operational schema design with triggers/anchors",
          "• Ops-style training with flow states and protocols",
          "",
          "SCHEMA TYPES:",
          "• Type A: 1 hour duration - Theta level induction",
          "• Type B: 24 hour duration - Flow state operations", 
          "• Type C: 1 week duration - Advanced programming",
          "",
          "⚠ EXTREME RISK: Cognitive dissonance, magical thinking",
          "⚠ MK-Ultra parallels - Ethics review required",
          "",
          "Navigate to /ksp-dossier for complete documentation."
        ]);
        break;

      case 'dossier':
        addToOutput([
          "═══ KSP COMPLETE DOCUMENTATION ═══",
          "",
          "Knot Solution Programming Technical Specifications:",
          "",
          "BRAINWAVE STATES:",
          "• Alpha (8–12 Hz): Relaxed alertness; creative visualization",
          "• Beta (12–30 Hz): Analytical focus; high beta risks anxiety",  
          "• Theta (4–8 Hz): Subconscious access; schema programming",
          "• Gamma (30–100+ Hz): Cognitive binding; multi-schema integration",
          "",
          "OPERATIONAL FRAMEWORK:",
          "• Flow durations: 1 week, 3 days, 24 hours, 1 hour",
          "• Task processing with embedded missions",
          "• Exit protocols: FlashLight, DropGate, Tie-Down",
          "",
          "PUBLISHING PATHWAYS:",
          "• Peer review: PsychINFO, PsychDB",
          "• Popular outlets: Psychology Today",
          "• Confidential: Restricted circulation only",
          "",
          "Access full dossier at /ksp-dossier"
        ]);
        break;

      case 'classify':
        addToOutput([
          "═══ CLASSIFICATION & RISK ASSESSMENT ═══",
          "",
          "CLASSIFICATION LEVEL: Internal / Restricted",
          "CLEARANCE REQUIRED: Academic/Research Personnel",
          "",
          "RISK LEVELS:",
          "🟢 LOW: Overview, Agency Seal, Publishing pathways",
          "🟡 MEDIUM: Materials, Tools, Operational framework",
          "🟠 HIGH: Foundation theory, Applications, Publishing",
          "🔴 EXTREME: Schema design, Risk assessment, Conclusion",
          "",
          "SAFETY PROTOCOLS:",
          "• Second party monitoring required",
          "• Dead battery backup systems",
          "• Exit sequence coordination",
          "• Cognitive dissonance prevention",
          "",
          "⚠ WARNING: Operational deployment prohibited",
          "Academic review and narrative construction only.",
          "",
          "Psychology Degree Minus Math Prerequisites"
        ]);
        break;

      case 'method':
      case 'scientific':
      case 'disprove':
      case 'theory':
        addToOutput([
          `${trimmed}`,
          ``,
          `[SCIENTIFIC METHOD] Theory Disproof Training Protocol`,
          ``,
          `🔬 System: Self-Study & Self-Report Methodology`,
          `🎯 Goal: Learn to actively disprove theories and detect biases`,
          `📊 Features: Real-time bias detection, metacognition monitoring`,
          ``,
          `Scientific Method Steps:`,
          `1. Question - What do you want to test or disprove?`,
          `2. Research - Gather knowledge and identify assumptions`,
          `3. Hypothesis - Form testable predictions that could be wrong`,
          `4. Experiment - Design tests to specifically disprove your theory`,
          `5. Analysis - Look objectively for disconfirming evidence`,
          `6. Conclusion - Accept when your theory has been disproven`,
          ``,
          `Available Commands:`,
          `• 'navigate /scientific-method' - Access full training system`,
          `• 'bias-check' - Run cognitive bias detection`,
          `• 'self-report' - Log current mental state and observations`,
          `• 'theory-test' - Start new theory testing session`,
          ``,
          `🧠 Remember: The goal is not to prove yourself right, but to find evidence that proves you wrong.`
        ]);
        break;

      case 'bias-check':
      case 'bias':
        addToOutput([
          `${trimmed}`,
          ``,
          `[BIAS DETECTION] Running Cognitive Bias Scan...`,
          ``,
          `⚠️  Potential Biases Detected:`,
          `• Confirmation Bias - Seeking information that confirms existing beliefs`,
          `• Anchoring Bias - Over-relying on first information received`, 
          `• Overconfidence Effect - Overestimating accuracy of beliefs`,
          `• Cherry Picking - Selecting only favorable evidence`,
          ``,
          `🧠 Mitigation Strategies:`,
          `• Actively seek disconfirming evidence`,
          `• Question your initial assumptions`,
          `• Consider alternative explanations`,
          `• Lower confidence levels (healthy skepticism)`,
          ``,
          `📊 Use 'navigate /scientific-method' for comprehensive bias training`
        ]);
        break;

      case 'self-report':
      case 'report':
        addToOutput([
          `${trimmed}`,
          ``,
          `[SELF-REPORT] Metacognition Monitoring System`,
          ``,
          `Current State Assessment:`,
          `• Emotional State: [Requires manual input]`,
          `• Cognitive Load: [1-10 scale]`,
          `• Expectations: [What do you hope to find?]`,
          `• Confidence Level: [0-100%]`,
          `• Bias Awareness: [Which biases might be affecting you?]`,
          ``,
          `🧠 Self-Report Benefits:`,
          `• Increases metacognitive awareness`,
          `• Helps identify emotional influences on reasoning`,
          `• Tracks confidence calibration over time`,
          `• Reveals pattern of biased thinking`,
          ``,
          `📊 Access full self-report system: 'navigate /scientific-method'`
        ]);
        break;

      case 'theory-test':
      case 'test-theory':
        addToOutput([
          `${trimmed}`,
          ``,
          `[THEORY TESTING] Disproof-Focused Research Protocol`,
          ``,
          `🎯 Theory Testing Framework:`,
          `1. State your theory clearly`,
          `2. Create falsifiable hypothesis`,
          `3. Design disproof methodology`,
          `4. Collect objective data`,
          `5. Analyze for disconfirming evidence`,
          `6. Draw honest conclusions`,
          ``,
          `⚠️  Key Principle: Seek evidence that proves your theory WRONG`,
          ``,
          `Scoring Criteria:`,
          `• +30 pts: Attempting to disprove vs prove`,
          `• +10 pts: Each bias identified`,
          `• +30 pts: Low confidence (healthy skepticism)`,  
          `• +40 pts: Actually being disproven`,
          ``,
          `🔬 Launch full theory testing: 'navigate /scientific-method'`
        ]);
        break;

      case 'music':
      case 'tracks':
      case 'playlist':
      case 'recommendations':
        addToOutput([
          `${trimmed}`,
          ``,
          `[MUSIC RECOMMENDATIONS] Pre-Work & Post-Work Protocol`,
          ``,
          `🎵 No Connections Required - Manual Track Selection Only`,
          `🧠 Brainwave-Synchronized Recommendations for Cognitive Enhancement`,
          ``,
          `TRANCE LEGENDS:`,
          `• ASOT - A State of Trance (Alpha/Beta 10-20 Hz)`,
          `• Tiesto - Classic focus tracks (Beta/Gamma 15-40 Hz)`,
          `• Armin Van Buuren - Uplifting trance (Alpha/Beta 12-25 Hz)`,
          `• Deadmau5 - Progressive house (Beta 12-30 Hz)`,
          ``,
          `ELECTRONIC FUSION:`,
          `• DJ_Dave - Custom psychological programming sets`,
          `• Switch Angel - Theta state induction (4-12 Hz)`,
          `• NERO - Cinematic dubstep (Beta/Gamma 20-45 Hz)`,
          `• Skrillex - High-intensity dubstep (Gamma 30-100 Hz)`,
          `• AfroJack - Big room house (Beta 15-30 Hz)`,
          ``,
          `GENRE MASTERY:`,
          `• DubStep - Extreme gamma activation (40-100+ Hz)`,
          `• Hardstyle - Sustained high-intensity (25-60 Hz)`,
          `• TechnoHouse - Rhythmic concentration (15-25 Hz)`,
          `• 90 Classic House - Nostalgic alpha states (10-20 Hz)`,
          `• TropicalHouse - Relaxed creativity (6-12 Hz)`,
          ``,
          `🎯 PRE-WORK: High energy, Beta/Gamma frequencies for activation`,
          `🌊 POST-WORK: Relaxed tempo, Alpha/Theta for integration`,
          ``,
          `📱 Access full recommendations: 'navigate /music'`
        ]);
        break;

      case 'pre-work':
      case 'prework':
        addToOutput([
          `${trimmed}`,
          ``,
          `[PRE-WORK MUSIC PROTOCOL] Cognitive Activation`,
          ``,
          `🎯 Goal: Prepare mind for intensive cognitive work`,
          `🧠 Target Frequencies: Beta (15-30 Hz) + Gamma (30-100+ Hz)`,
          `⚡ Intensity: Medium to Extreme`,
          ``,
          `RECOMMENDED TRACKS:`,
          `• ASOT - Trance selection (High intensity, 60-180 min)`,
          `• Tiesto - Focus building (High intensity, 45-120 min)`,
          `• NERO - Cinematic dubstep (Extreme intensity, 30-75 min)`,
          `• Skrillex - Maximum alertness (Extreme intensity, 15-45 min)`,
          `• Hardstyle - Sustained focus (Extreme intensity, 30-90 min)`,
          `• DubStep - Gamma activation (Extreme intensity, 15-60 min)`,
          ``,
          `⚡ Effect: Alert focus, analytical thinking, peak performance`,
          `🕒 Use Before: Psychological programming sessions, study work`,
          ``,
          `🎵 Full pre-work catalog: 'navigate /music' → Pre-Work Protocol`
        ]);
        break;

      case 'post-work':
      case 'postwork':
        addToOutput([
          `${trimmed}`,
          ``,
          `[POST-WORK MUSIC PROTOCOL] Integration & Recovery`,
          ``,
          `🌊 Goal: Consolidate learning and transition to relaxed states`,
          `🧠 Target Frequencies: Alpha (8-12 Hz) + Theta (4-8 Hz)`,
          `📉 Intensity: Low to Medium`,
          ``,
          `RECOMMENDED TRACKS:`,
          `• Switch Angel - Theta induction (Low intensity, 20-60 min)`,
          `• TropicalHouse - Relaxed creativity (Low intensity, 30-90 min)`,
          `• 90 Classic House - Nostalgic alpha (Medium intensity, 45-120 min)`,
          `• DJ_Dave - Integration sets (Medium intensity, 30-90 min)`,
          `• Deadmau5 - Flow states (Medium intensity, 45-90 min)`,
          ``,
          `🧘 Effect: Relaxed awareness, memory consolidation, deep processing`,
          `🕒 Use After: Intensive sessions, learning consolidation`,
          ``,
          `🎵 Full post-work catalog: 'navigate /music' → Post-Work Protocol`
        ]);
        break;

      case 'education':
      case 'study':
      case 'palace':
      case 'duck':
      case 'mentalist':
        addToOutput([
          `${trimmed}`,
          ``,
          `[EDUCATION MATERIALS] Mentalist Training Guide`,
          ``,
          `🧠 Mind Palace + Rubber Duck Debugging for Memory & Mentalism`,
          `📚 Advanced study techniques for cognitive enhancement`,
          ``,
          `CORE TECHNIQUES:`,
          `• Mind Palace (Method of Loci) - Spatial memory encoding`,
          `• Rubber Duck Debugging - Verbal explanation for gap detection`,
          `• Mentalist Debugging Palace - Combined advanced system`,
          ``,
          `MIND PALACE CONSTRUCTION:`,
          `1. Choose familiar location (home, school, street)`,
          `2. Map key stations (rooms, hallways, objects)`,
          `3. Convert info into vivid, exaggerated imagery`,
          `4. Walk through palace placing images sequentially`,
          `5. Expand and layer multiple palaces for topics`,
          ``,
          `DEBUGGING PROCESS:`,
          `1. Choose your 'duck' (object, mirror, or palace character)`,
          `2. Walk through palace explaining each station aloud`,
          `3. Debug weak spots by strengthening unclear images`,
          `4. Repeat until explanation flows without hesitation`,
          ``,
          `EXAMPLE PSYCHOLOGY PALACE:`,
          `• Front Door → Freud with cigar (Psychology Intro)`,
          `• Living Room → Brain-shaped sofa (Cognitive Theory)`,
          `• Kitchen Sink → Colored wave water (Brainwave States)`,
          `• Bedroom Desk → Knotted textbooks (Schema Programming)`,
          `• Garage → Martial artist with quotes (Philosophy)`,
          ``,
          `🎯 CLOSING ETHOS: Think for yourself. Question everything. DYOR.`,
          ``,
          `📖 Access full training guide: 'navigate /education'`
        ]);
        break;

      case 'mind-palace':
      case 'loci':
        addToOutput([
          `${trimmed}`,
          ``,
          `[MIND PALACE] Method of Loci - Advanced Memory Technique`,
          ``,
          `🏛️ Ancient technique used by orators, mentalists, memory athletes`,
          `🧠 Leverages spatial memory - brain's natural location recall ability`,
          ``,
          `CONSTRUCTION STEPS:`,
          `1. Choose Familiar Location - Home, school, street (distinct stations)`,
          `2. Map Key Loci - Kitchen table, front door, bookshelf, etc.`,
          `3. Visual Encoding - Convert info to vivid, exaggerated imagery`,
          `4. Sequential Walkthrough - Place images, then recall by walking`,
          `5. Expand & Layer - Multiple palaces for different topics`,
          ``,
          `EXAMPLE ENCODING:`,
          `Need to remember "Einstein + violin"?`,
          `→ Imagine Einstein playing violin in your bathroom sink, splashing water`,
          `→ Absurd + vivid = memorable`,
          ``,
          `BENEFITS:`,
          `• Unlimited storage capacity`,
          `• Perfect for sequential information`,
          `• Integrates with psychological programming`,
          `• Used by world memory champions`,
          ``,
          `⚡ Difficulty: Intermediate | Duration: 30-60 min to build`,
          ``,
          `🎓 Full interactive example: 'navigate /education'`
        ]);
        break;

      case 'rubber-duck':
      case 'debugging':
        addToOutput([
          `${trimmed}`,
          ``,
          `[RUBBER DUCK DEBUGGING] Verbal Explanation Technique`,
          ``,
          `🦆 Adapted from programming: explain code to rubber duck`,
          `🧠 Forces clarity, exposes gaps, improves retention`,
          ``,
          `MENTALISM ADAPTATION:`,
          `1. Choose Your Duck - Object, stuffed toy, mirror, or palace character`,
          `2. Explain What You Stored - Walk palace verbally narrating stations`,
          `3. Debug the Logic - Identify where explanation falters`,
          `4. Anchor by Repetition - Repeat 2-3 times until fluent`,
          ``,
          `WHY IT WORKS:`,
          `• Verbal Rehearsal - Locks knowledge in multiple modalities`,
          `• Gap Detection - Forces confrontation with weak associations`,
          `• Teaching Effect - By teaching duck, you teach yourself`,
          ``,
          `DEBUGGING EXAMPLE:`,
          `"In my kitchen, Einstein is playing violin..."`,
          `→ If you stumble: image is weak, needs strengthening`,
          `→ Refine until absurdly memorable`,
          ``,
          `ADVANCED TIPS:`,
          `• Use multiple ducks (logic, creativity, skepticism)`,
          `• Record sessions for audio reinforcement`,
          `• Cross-train with martial arts drills`,
          ``,
          `⚡ Difficulty: Beginner | Duration: 10-20 min per session`,
          ``,
          `📚 Complete debugging guide: 'navigate /education'`
        ]);
        break;

      default:
        if (trimmed) {
          addToOutput([
            `Command not found: ${cmd}`,
            "Type 'help' for available commands."
          ]);
        }
        break;
    }

    addToOutput([""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      setCommandHistory(prev => [...prev, currentInput]);
      processCommand(currentInput);
      setCurrentInput("");
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  return (
    <div className="h-full bg-black rounded-lg border border-gray-700 overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-400 text-xs">_Fq Brainwave Terminal - Enhanced Mode</span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <StatusIndicator status="online" />
          <AccessibilitySymbol type="Classified" />
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-2 sm:p-4 h-[calc(100%-2.5rem)] sm:h-[calc(100%-3rem)] overflow-y-auto bg-black text-terminal-red-primary text-xs sm:text-sm"
      >
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        
        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-1 sm:mt-2">
          <span className="text-terminal-red-bright mr-1 sm:mr-2 text-xs sm:text-sm">
            <span className="hidden sm:inline">operative@fq_system:~$</span>
            <span className="sm:hidden">$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal-red-primary caret-terminal-red-bright text-xs sm:text-sm"
            autoFocus
            placeholder="Enter command..."
          />
        </form>
      </div>

      {/* Sacred Geometry Frequency Visualizer */}
      <FrequencyCommandVisualizer
        isVisible={showFrequencyViz}
        frequency={currentFrequency}
        duration={5000}
        onComplete={() => setShowFrequencyViz(false)}
      />
    </div>
  );
}