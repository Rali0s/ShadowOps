# Overview
Fq is a brainwave frequency analysis training platform designed as a full-stack web application. It integrates psychological programming elements from "Knot-So-lution Programming" within a thematic narrative of infiltrating Blackbriar to acquire classified manuals. The platform provides an interactive, open-access, terminal-based learning environment for brainwave frequency training across Alpha, Beta, Theta, and Gamma bands. Key capabilities include psychological programming features like Education of Ops Manuals, Anchor/Knot/TieDown Triggers, visual recall operations, and Blackbriar infiltration archives, demonstrating the evolution of classified military techniques into civilian cognitive enhancement.

# User Preferences
Preferred communication style: Simple, everyday language.
Navigation preferences: Removed courses tab from navigation system per user request.
System architecture: Completely removed course system - platform now uses pure tier-based access only with brainwave frequency training (Alpha, Beta, Theta, Gamma).
Authentication system: REMOVED - User requested "repair auth section - no auth or logins needed" - Platform now operates as open access system without user authentication or login requirements.
Self-reporting system: REMOVED - User requested removal of self-reporting and input fields as "it will scare people on the public" and noted this is not a real psychological study under APA guidelines that cannot collect data.
Admin system: REMOVED - User requested removal of admin tab from navigation.
Terminal integration: UPDATED - Terminal functionality moved from separate pages to main homepage integration for streamlined user experience.
Navigation streamlining: UPDATED - Removed terminal-specific navigation links, advanced terminal page, and faraday study completely from platform.
Self-report methodology: ADDED - User requested to "teach how to self report instead" - Created educational methodology page teaching scientific self-observation techniques without any data collection by the platform. Expanded to include advanced cognitive research models: top-down/bottom-up processing, inductive/deductive reasoning, transactional/relational processing, with planned future expansion for heuristics and behavioral analysis frameworks.
Sacred geometry visualization: ADDED - User requested red-based sacred geometry auto-wheel with high-speed elliptical patterns, 13 alternating circles with complex triangles and varying directional shapes, broader complex shapes between cross sections for future self-programming goals integration.
Psychological programming integration: ADDED - Full integration of "Knot-So-lution Programming" study with Education of Ops Manuals, Trigger-Anchor-Knot system, psychological schema operations (A, B, C types), and visual recall operations with "PRODUCT OF A MAD MAN" disclaimer warnings.
Neural Matrix backstory integration: ADDED - Thematic narrative of infiltrating Neural Matrix (formerly Blackbriar) through age falsification, acquiring classified psychological programming manuals before public release, with full declassified document archives showing evolution from military psychological warfare to civilian cognitive enhancement platform.
KSP Dossier integration: ADDED - Complete Knot Solution Programming dossier with full technical specifications, 10-section classified documentation, agency seal with sacred geometry, brainwave state definitions, schema design protocols, operational frameworks, risk assessments, and publishing pathways with "Product of A Mad Man" disclaimer system.
Anchor Words System: ADDED - Custom input fields for anchor word programming over visual matrix with categories (trigger, anchor, codeoff, pleasure), frequency/duration controls, and real-time overlay integration with sacred geometry wheel.
Code-Off and Pleasure Sequences: ADDED - Interactive sequences with music integration, reality grounding mechanisms, flow state optimization, and visual matrix overlay functionality for enhanced psychological programming operations.
Faraday Black Box Study: ADDED - Complete turnkey psychological research methodology featuring interactive inference game with deterministic, probabilistic, adversarial, and null box conditions for studying black-box reasoning, noise tolerance, query strategy efficiency, and metacognitive calibration.
Platform Tagline: UPDATED - Changed tagline from "Brainwave Frequency Training" to "Is This A Simulation" per user request.
Declassification Philosophy: ADDED - Homepage now includes philosophical question about accidental declassification of "Neural Matrix" operations, exploring the paradox of intent vs. consequence in the evolution from classified military techniques to civilian cognitive enhancement platforms.
FOIA Search Tips: ADDED - Self-study research tips section directing users to search Freedom of Information Act databases themselves (FBI vault, CIA reading room, NSA archives, military records) with "Think for yourself. Question everything. DYOR" philosophy for authentic study materials.
Scientific Method Training: ADDED - Comprehensive self-study and self-report methodology system for teaching scientific method through theory disproof, bias detection, metacognition monitoring, and research-grade data collection with real-time feedback loops.
Music Recommendations: ADDED - Pre-Work and Post-Work music listing system with brainwave-synchronized recommendations including ASOT, Tiesto, Armin Van Buuren, Deadmau5, DJ_Dave, Switch Angel, NERO, Skrillex, AfroJack, DubStep, Hardstyle, TechnoHouse, 90 Classic House, and TropicalHouse with no streaming connections - manual track selection only.
Education Materials: ADDED - Comprehensive mentalist training guide featuring Mind Palace (Method of Loci), Rubber Duck Debugging techniques, and combined systems for memory enhancement. Includes interactive palace walkthrough, debugging processes, and advanced tips with "Think for yourself. Question everything. DYOR." philosophy integration.

# System Architecture

## Core Technologies
- **Frontend**: React with TypeScript (Vite), Wouter for routing, TanStack Query for server state, React Context for state management, Radix UI/shadcn/ui for components, Tailwind CSS for styling, React Hook Form with Zod for forms.
- **Backend**: Node.js with Express.js, ESBuild for bundling.
- **Database**: PostgreSQL (Neon serverless) with Drizzle ORM and Drizzle Kit for migrations.

## Key Architectural Decisions & Features
- **Open Access Platform**: No user authentication, login, or registration required. All functionality is freely accessible.
- **Brainwave Frequency Training**: Core functionality provided across Alpha, Beta, Theta, and Gamma frequencies.
- **Terminal Emulator**: React-based interactive terminal integrated into homepage with command processing, custom red theme, SVG symbol rendering for accessibility, and commands for brainwave training, sacred geometry, psychological programming, and Neural Matrix narrative access.
- **Sacred Geometry Auto-Wheel**: Red-based, animated visualization with 13 alternating circles in elliptical patterns, complex triangles, and cross-sectional elements. Synchronizes speed and intensity with current brainwave frequency.
- **Psychological Programming System**: Integrates "Knot-So-lution Programming" with Ops Manuals (Schema A, B, C), Trigger-Anchor-Knot system, Tiedown Protocols, and Visual Recall Operations. Includes "PRODUCT OF A MAD MAN" disclaimers.
- **Neural Matrix Infiltration Narrative**: Thematic integration of a backstory involving infiltration and acquisition of classified psychological programming manuals, presented through declassified document archives.
- **KSP Dossier System**: A 10-section classified dossier detailing "Knot-So-lution Programming" technical specifications, risk assessments, and publishing pathways, with integrated disclaimers.
- **Payment Integration**: Stripe for subscription management (currently unused due to open-access model but architected for future use), with server-side subscription creation and client-side payment confirmation.

# External Dependencies

## Payment Processing
- **Stripe**: Client-side (`@stripe/stripe-js`, `@stripe/react-stripe-js`) and server-side (`stripe`) SDKs for payment infrastructure.

## Database Services
- **Neon Database**: PostgreSQL-compatible serverless database.

## UI Frameworks & Styling
- **Radix UI**: Accessible, unstyled UI primitives.
- **shadcn/ui**: Pre-built component library.
- **Tailwind CSS**: Utility-first CSS framework.

## Development Tools
- **Vite**: Fast development server and build tool.
- **TypeScript**: For full-stack type safety.