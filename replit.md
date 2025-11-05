# Overview
Fq is a neurohacker membership platform leveraging experimental relaxation research and bonus programs to enhance study capabilities. It features the ShadowFang AIO (All-In-One) training system, offering brainwave frequency training (Alpha, Beta, Theta, Gamma). The platform aims to transform classified military psychological warfare techniques into civilian cognitive enhancement tools, challenging users with "Is This A Simulation."

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
Language Support & Translation: ADDED - Full i18n infrastructure with react-i18next supporting English, Japanese, and Spanish (Spain). User speaks English and Spanish (Spain) fluently and can verify these translations. Japanese translations are AI-generated and UNVERIFIED (user cannot read/speak Japanese). Translation approach: Using free AI translation until profit, then upgrading to professional native translation. Language switcher uses radio button design with flags (🇺🇸 EN, 🇯🇵 JA, 🇪🇸 ES) for easy switching. Translation Quality Notice displayed for non-English languages: Currently using AI-enhanced translation for Japan, Spain, and soon Russia. Current status: Manually vetting AI Spain-based Spanish content by hand. Phased upgrade plan: Phase 1 (Profit) = Professional native translation by certified translators for paid content; Phase 2 (Growth) = Cultural adaptation and localization refinement for paid content. Users encouraged to report translation issues in Discord community.
Tiered Navigation Menu: UPDATED - Simplified hamburger menu for new users with progressive disclosure. Free tier shows only 4 core items (ShadowFang Training, Ops Manual, Neural Matrix, Frequency Generator). Tier 2 paid menu items (KSP Dossier, Grounding Methods, Scientific Method, Education, Methodology) are locked with visual indicators for non-subscribers and fully accessible to paid members.
Grounding Methods: ADDED - New Tier 2 feature with 4 reality-anchoring techniques: (1) GPS Coordinates & Match - verify physical location with geolocation API, (2) UTC Time Clock - universal coordinated time display, (3) Zulu Time - military/aviation time format with educational explanation (DDHHMMZ MMM YY), (4) Solo Inception - environmental validation by hiding objects and finding them upon return, with manual mental grounding fallback if object is missing.

# System Architecture

## Core Technologies
- **Frontend**: React with TypeScript (Vite), Wouter for routing, TanStack Query for server state, React Context for state management, Radix UI/shadcn/ui for components, Tailwind CSS for styling, React Hook Form with Zod for forms.
- **Backend**: Node.js with Express.js, ESBuild for bundling.
- **Database**: PostgreSQL (Neon serverless) with Drizzle ORM and Drizzle Kit for migrations.

## Key Architectural Decisions & Features
- **Tiered Beta Access Platform**: Dual OAuth (Discord and Auth0) for authentication, with Auth0 users automatically granted beta access.
- **Demo Mode**: Full-access demo available when no authentication providers are configured.
- **Brainwave Frequency Training**: Core functionality, supporting Alpha, Beta, Theta, and Gamma frequencies.
- **Terminal Emulator**: Interactive React-based terminal on the homepage for various platform functions.
- **Sacred Geometry Auto-Wheel**: Animated, red-based visualization synchronized with brainwave frequencies.
- **Psychological Programming System**: "Knot-So-lution Programming" with Ops Manuals, Trigger-Anchor-Knot system, and disclaimers.
- **Neural Matrix Infiltration Narrative**: Thematic backstory based on declassified documents.
- **KSP Dossier System**: A 10-section classified dossier for "Knot-So-lution Programming."
- **Global Rebrand**: "Blackbriar" references updated to "ShadowFang."
- **Payment Integration**: Stripe for subscription management.

# External Dependencies

## Payment Processing
- **Stripe**: Client and server-side SDKs for subscription management.

## Database Services
- **Neon Database**: PostgreSQL-compatible serverless database.

## UI Frameworks & Styling
- **Radix UI**: Accessible UI primitives.
- **shadcn/ui**: Pre-built component library.
- **Tailwind CSS**: Utility-first CSS framework.

## Development Tools
- **Vite**: Fast development server and build tool.
- **TypeScript**: For full-stack type safety.
- **react-i18next**: For internationalization (English, Japanese, Spanish).

# Recent Changes

## Dual OAuth Authentication System (November 5, 2025)
**Complete Dual Provider Implementation**: Platform now supports BOTH Discord and Auth0 OAuth authentication simultaneously, allowing users to choose their preferred login method. This enables gradual migration while maintaining backward compatibility with existing Discord users.

**Backend Infrastructure:**
- **Discord OAuth Routes**: `/api/auth/discord/login`, `/api/auth/discord/callback`, `/api/auth/discord/recheck` (existing functionality preserved)
- **Auth0 OAuth Routes**: `/api/auth/auth0/login`, `/api/auth0/callback` (new implementation with PKCE state validation)
- **Database Schema**: Supports both provider identities - Discord fields (`discordId`, `discordUsername`, `discordAvatar`, `discordVerified`) AND Auth0 fields (`auth0Id`, `auth0Username`, `auth0Avatar`)
- **Storage Layer**: Provider-agnostic methods support both `upsertUserByDiscord` and `upsertUserByAuth0` with unified `getUser` interface
- **User Endpoint**: `/api/user` returns all OAuth fields for both providers
- **Payment Bypass**: Updated `/api/payment-bypass-config` to show enabled status for both Discord and Auth0 providers

**Frontend Integration:**
- **Dual Login Buttons**: Auth page displays both `Auth0LoginButton` (orange #EB5424) and `DiscordLoginButton` (purple #5865F2) side-by-side
- **useAuth Hook**: Supports both `loginWithDiscord()` and `loginWithAuth0()` functions for provider selection
- **Authorization Logic**: Recognizes Discord users (via `discordVerified`) AND Auth0 users (via `auth0Id`) with automatic beta tier for both

**Access Control:**
- **Discord Users**: Existing guild verification flow unchanged, beta access based on guild membership
- **Auth0 Users**: Automatic beta tier assignment on first login, immediate platform access
- **Demo Mode**: Full access when no OAuth providers configured (no API keys required)
- **Production Mode**: Requires either Discord OR Auth0 authentication, email/password disabled

**Environment Variables:**
- Discord: `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_REDIRECT_URI`, `DISCORD_PUBLIC_KEY`, `DISCORD_GUILD_ID`
- Auth0: `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_CALLBACK_URL`
- If neither provider configured, platform runs in demo mode