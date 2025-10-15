# Overview
Fq is a neurohacker membership platform focused on helping people study through experimental relaxation research and bonus programs. It features the ShadowFang AIO (All-In-One) training system, launching with a tiered beta access approach. The platform emphasizes brainwave frequency training (Alpha, Beta, Theta, Gamma) and includes a countdown-driven sales page, comprehensive training manual, and streamlined user experience. The project aims to evolve from classified military psychological warfare techniques to a civilian cognitive enhancement platform, challenging users to question reality with the tagline "Is This A Simulation."

# User Preferences
Preferred communication style: Simple, everyday language.
Navigation preferences: Removed courses tab from navigation system per user request.
System architecture: Completely removed course system - platform now uses pure tier-based access only with brainwave frequency training (Alpha, Beta, Theta, Gamma).
Self-reporting system: REMOVED - User requested removal of self-reporting and input fields as "it will scare people on the public" and noted this is not a real psychological study under APA guidelines that cannot collect data.
Admin system: REMOVED - User requested removal of admin tab from navigation.
Terminal integration: UPDATED - Terminal functionality moved from separate pages to main homepage integration for streamlined user experience.
Navigation streamlining: UPDATED - Removed terminal-specific navigation links, advanced terminal page, and faraday study completely from platform.
Self-report methodology: TIERED SYSTEM - Implemented "Solo Double-Blind" approach with two tiers: Tier One (free) provides basic notebook methodology emphasizing privacy, simplicity, flexibility, permanence, and mindfulness. Tier Two (paid Researcher tier) unlocks advanced research methodologies including cognitive models (top-down/bottom-up, inductive/deductive, transactional/relational), data analysis techniques, statistical approaches, and behavioral observation frameworks - all designed for analyzing handwritten notebook data by hand. Platform still never collects or logs any user data.
Sacred geometry visualization: ADDED - User requested red-based sacred geometry auto-wheel with high-speed elliptical patterns, 13 alternating circles with complex triangles and varying directional shapes, broader complex shapes between cross sections for future self-programming goals integration.
Psychological programming integration: ADDED - Full integration of "Knot-So-lution Programming" study with Education of Ops Manuals, Trigger-Anchor-Knot system, psychological schema operations (A, B, C types), and visual recall operations with "PRODUCT OF A MAD MAN" disclaimer warnings.
Neural Matrix backstory integration: ADDED - Thematic narrative of infiltrating Neural Matrix (formerly ShadowFang) through age falsification, acquiring classified psychological programming manuals before public release, with full declassified document archives showing evolution from military psychological warfare to civilian cognitive enhancement platform.
KSP Dossier integration: ADDED - Complete Knot Solution Programming dossier with full technical specifications, 10-section classified documentation, agency seal with sacred geometry, brainwave state definitions, schema design protocols, operational frameworks, risk assessments, and publishing pathways with "Product of A Mad Man" disclaimer system. TEMPORARILY HIDDEN - User studying content, will be re-enabled when ready.
Anchor Words System: ADDED - Custom input fields for anchor word programming over visual matrix with categories (trigger, anchor, codeoff, pleasure), frequency/duration controls, and real-time overlay integration with sacred geometry wheel.
Code-Off and Pleasure Sequences: ADDED - Interactive sequences with music integration, reality grounding mechanisms, flow state optimization, and visual matrix overlay functionality for enhanced psychological programming operations.
Faraday Black Box Study: ADDED - Complete turnkey psychological research methodology featuring interactive inference game with deterministic, probabilistic, adversarial, and null box conditions for studying black-box reasoning, noise tolerance, query strategy efficiency, and metacognitive calibration.
Declassification Philosophy: ADDED - Homepage now includes philosophical question about accidental declassification of "Neural Matrix" operations, exploring the paradox of intent vs. consequence in the evolution from classified military techniques to civilian cognitive enhancement platforms.
FOIA Search Tips: ADDED - Self-study research tips section directing users to search Freedom of Information Act databases themselves (FBI vault, CIA reading room, NSA archives, military records) with "Think for yourself. Question everything. DYOR" philosophy for authentic study materials.
Scientific Method Training: ADDED - Comprehensive self-study and self-report methodology system for teaching scientific method through theory disproof, bias detection, metacognition monitoring, and research-grade data collection with real-time feedback loops.
Music Recommendations: REMOVED - User requested removal of music section.
Education Materials: ADDED - Comprehensive mentalist training guide featuring Mind Palace (Method of Loci), Rubber Duck Debugging techniques, and combined systems for memory enhancement. Includes interactive palace walkthrough, debugging processes, and advanced tips with "Think for yourself. Question everything. DYOR." philosophy integration.
Research Foundation: ADDED - Integration of three published research papers on visual augmentation (38.2 vs 31.5 recall, +47% theta power), frequency-enhanced study method (phase-specific protocols), and mental rehearsal (environmental anchoring). Research shows multimodal entrainment significantly outperforms unimodal approaches with large effect sizes (η² = .304, d = 1.34).
Language Support & Translation: ADDED - Full i18n infrastructure with react-i18next supporting English, Japanese, and Spanish (Spain). User speaks English and Spanish (Spain) fluently and can verify these translations. Japanese translations are AI-generated and UNVERIFIED (user cannot read/speak Japanese). Translation approach: Using free AI translation until profit, then upgrading to professional native translation. Language switcher uses radio button design with flags (🇺🇸 EN, 🇯🇵 JA, 🇪🇸 ES) for easy switching.
Tiered Navigation Menu: UPDATED - Simplified hamburger menu for new users with progressive disclosure. Free tier shows only 4 core items (ShadowFang Training, Ops Manual, Neural Matrix, Frequency Generator). Tier 2 paid menu items (KSP Dossier, Grounding Methods, Scientific Method, Education, Methodology) are locked with visual indicators for non-subscribers and fully accessible to paid members.
Grounding Methods: ADDED - New Tier 2 feature with 4 reality-anchoring techniques: (1) GPS Coordinates & Match - verify physical location with geolocation API, (2) UTC Time Clock - universal coordinated time display, (3) Zulu Time - military/aviation time format with educational explanation (DDHHMMZ MMM YY), (4) Solo Inception - environmental validation by hiding objects and finding them upon return, with manual mental grounding fallback if object is missing.

# System Architecture

## Core Technologies
- **Frontend**: React with TypeScript (Vite), Wouter for routing, TanStack Query for server state, React Context for state management, Radix UI/shadcn/ui for components, Tailwind CSS for styling, React Hook Form with Zod for forms.
- **Backend**: Node.js with Express.js, ESBuild for bundling.
- **Database**: PostgreSQL (Neon serverless) with Drizzle ORM and Drizzle Kit for migrations.

## Key Architectural Decisions & Features
- **Tiered Beta Access Platform**: Discord OAuth authentication required for site access. Users must join Discord community, get beta access, then upgrade to $5.89/mo subscription for continued access.
- **Brainwave Frequency Training**: Core functionality across Alpha, Beta, Theta, and Gamma frequencies.
- **Terminal Emulator**: React-based interactive terminal on homepage with commands for brainwave training, sacred geometry, psychological programming, and Neural Matrix narrative access.
- **Sacred Geometry Auto-Wheel**: Red-based, animated visualization with 13 alternating circles, complex triangles, and cross-sectional elements, synchronizing with brainwave frequency.
- **Psychological Programming System**: Integrates "Knot-So-lution Programming" with Ops Manuals (Schema A, B, C), Trigger-Anchor-Knot system, Tiedown Protocols, and Visual Recall Operations, including disclaimers.
- **Neural Matrix Infiltration Narrative**: Thematic backstory of infiltrating and acquiring classified psychological programming manuals via declassified document archives.
- **KSP Dossier System**: A 10-section classified dossier detailing "Knot-So-lution Programming" technical specifications, risk assessments, and publishing pathways with disclaimers.
- **Global Rebrand**: All "Blackbriar" references updated to "ShadowFang."
- **Payment Integration**: Stripe architected for subscription management.

# External Dependencies

## Payment Processing
- **Stripe**: Client-side (`@stripe/stripe-js`, `@stripe/react-stripe-js`) and server-side (`stripe`) SDKs.

## Database Services
- **Neon Database**: PostgreSQL-compatible serverless database.

## UI Frameworks & Styling
- **Radix UI**: Accessible, unstyled UI primitives.
- **shadcn/ui**: Pre-built component library.
- **Tailwind CSS**: Utility-first CSS framework.

## Development Tools
- **Vite**: Fast development server and build tool.
- **TypeScript**: For full-stack type safety.
- **react-i18next**: For internationalization (English, Japanese [unverified], Spanish [Spain]).

# Recent Changes

## Menu Simplification & Grounding Methods (October 2025)
**Tiered Menu Navigation**: Simplified hamburger menu to reduce cognitive overload for new users. Free tier displays only 4 essential pages (ShadowFang Training, Ops Manual, Neural Matrix, Frequency Generator). Tier 2 items (KSP Dossier, Grounding Methods, Scientific Method, Education, Methodology) show as locked with Crown icon and "Researcher Tier" badge for non-subscribers, fully unlocked for paid members ($5.89/mo).

**Grounding Methods Page**: New Tier 2 exclusive feature providing 4 reality-anchoring techniques:
1. **GPS Coordinates & Match**: Browser geolocation API integration with Haversine formula distance calculation (100m tolerance). Users input expected coordinates, system fetches actual GPS, validates match for reality confirmation.
2. **UTC Time Clock**: Real-time Universal Coordinated Time display updating every second for objective temporal grounding.
3. **Zulu Time**: Military/aviation time format (DDHHMMZ MMM YY) with educational alert explaining format structure. Live updates synchronized with UTC.
4. **Solo Inception**: Environmental validation protocol - users describe and hide object before leaving location, attempt to find upon return. Found object = reality anchor confirmed. Missing object = triggers manual mental grounding protocol (breath focus, 5 physical sensations, verbal identity/location verification).

**UX Improvements**: 
- Menu items use consistent 10px vertical padding (5px top, 5px bottom) across all resolutions
- Non-subscribers see disabled Tier 2 items with lock icons and muted styling
- "Unlock Researcher Tier" CTA button shown only to non-subscribers
- Subscribers see all menu items active with hover states and proper navigation