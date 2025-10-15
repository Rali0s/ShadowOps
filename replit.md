# Overview
_Fq is a neurohacker membership platform launching with beta pricing ($5.89/mo locked, future $20/mo). The platform features the ShadowFang AIO (All-In-One) training system with a tiered beta access approach (Discord → Elite membership). Core mission: Help People Study through Experimental Relaxation Research and Bonus Programs. The beta launch includes a countdown-driven sales page, comprehensive training manual, and streamlined user experience focused on brainwave frequency training across Alpha, Beta, Theta, and Gamma bands.

# User Preferences
Preferred communication style: Simple, everyday language.
Navigation preferences: Removed courses tab from navigation system per user request.
System architecture: Completely removed course system - platform now uses pure tier-based access only with brainwave frequency training (Alpha, Beta, Theta, Gamma).
Authentication system: IMPLEMENTED - Discord OAuth tiered beta access system with community verification. Users must join Discord community first, then get beta access until December 6, 2025, followed by $5.89/mo subscription for continued access. Full production-ready implementation with secure session management.
Self-reporting system: REMOVED - User requested removal of self-reporting and input fields as "it will scare people on the public" and noted this is not a real psychological study under APA guidelines that cannot collect data.
Admin system: REMOVED - User requested removal of admin tab from navigation.
Terminal integration: UPDATED - Terminal functionality moved from separate pages to main homepage integration for streamlined user experience.
Navigation streamlining: UPDATED - Removed terminal-specific navigation links, advanced terminal page, and faraday study completely from platform.
Self-report methodology: SIMPLIFIED - User requested removal of all digital logging features. Page now simply recommends using a physical notebook and pen/pencil for personal observations. No data collection, no tracking apps, no complex systems - just analog documentation for privacy and simplicity.
Sacred geometry visualization: ADDED - User requested red-based sacred geometry auto-wheel with high-speed elliptical patterns, 13 alternating circles with complex triangles and varying directional shapes, broader complex shapes between cross sections for future self-programming goals integration.
Psychological programming integration: ADDED - Full integration of "Knot-So-lution Programming" study with Education of Ops Manuals, Trigger-Anchor-Knot system, psychological schema operations (A, B, C types), and visual recall operations with "PRODUCT OF A MAD MAN" disclaimer warnings.
Neural Matrix backstory integration: ADDED - Thematic narrative of infiltrating Neural Matrix (formerly ShadowFang) through age falsification, acquiring classified psychological programming manuals before public release, with full declassified document archives showing evolution from military psychological warfare to civilian cognitive enhancement platform.
KSP Dossier integration: ADDED - Complete Knot Solution Programming dossier with full technical specifications, 10-section classified documentation, agency seal with sacred geometry, brainwave state definitions, schema design protocols, operational frameworks, risk assessments, and publishing pathways with "Product of A Mad Man" disclaimer system. TEMPORARILY HIDDEN - User studying content, will be re-enabled when ready.
Anchor Words System: ADDED - Custom input fields for anchor word programming over visual matrix with categories (trigger, anchor, codeoff, pleasure), frequency/duration controls, and real-time overlay integration with sacred geometry wheel.
Code-Off and Pleasure Sequences: ADDED - Interactive sequences with music integration, reality grounding mechanisms, flow state optimization, and visual matrix overlay functionality for enhanced psychological programming operations.
Faraday Black Box Study: ADDED - Complete turnkey psychological research methodology featuring interactive inference game with deterministic, probabilistic, adversarial, and null box conditions for studying black-box reasoning, noise tolerance, query strategy efficiency, and metacognitive calibration.
Platform Tagline: "Is This A Simulation" - Positioned as neurohacker beta membership site.
Beta Launch Strategy: IMPLEMENTED - T-minus 45 days countdown timer, $5.89/mo beta pricing (locked forever), tiered access system (Discord first, then Elite), simplified to one comprehensive training manual.
Global Rebrand: COMPLETED - Changed all "Blackbriar" references to "ShadowFang" throughout entire platform.
Declassification Philosophy: ADDED - Homepage now includes philosophical question about accidental declassification of "Neural Matrix" operations, exploring the paradox of intent vs. consequence in the evolution from classified military techniques to civilian cognitive enhancement platforms.
FOIA Search Tips: ADDED - Self-study research tips section directing users to search Freedom of Information Act databases themselves (FBI vault, CIA reading room, NSA archives, military records) with "Think for yourself. Question everything. DYOR" philosophy for authentic study materials.
Scientific Method Training: ADDED - Comprehensive self-study and self-report methodology system for teaching scientific method through theory disproof, bias detection, metacognition monitoring, and research-grade data collection with real-time feedback loops.
Music Recommendations: REMOVED - User requested removal of music section.
Education Materials: ADDED - Comprehensive mentalist training guide featuring Mind Palace (Method of Loci), Rubber Duck Debugging techniques, and combined systems for memory enhancement. Includes interactive palace walkthrough, debugging processes, and advanced tips with "Think for yourself. Question everything. DYOR." philosophy integration.
Research Foundation: ADDED - Integration of three published research papers on visual augmentation (38.2 vs 31.5 recall, +47% theta power), frequency-enhanced study method (phase-specific protocols), and mental rehearsal (environmental anchoring). Research shows multimodal entrainment significantly outperforms unimodal approaches with large effect sizes (η² = .304, d = 1.34).
Japanese Language Support: ADDED - Full i18n infrastructure with react-i18next, Japanese translation files (common, terminal, research, training, auth namespaces), language switcher component, translation disclaimer explaining AI→Professional upgrade path, and Noto Sans JP font support. Using free AI translation until profit, then upgrading to professional native translation.

# System Architecture

## Core Technologies
- **Frontend**: React with TypeScript (Vite), Wouter for routing, TanStack Query for server state, React Context for state management, Radix UI/shadcn/ui for components, Tailwind CSS for styling, React Hook Form with Zod for forms.
- **Backend**: Node.js with Express.js, ESBuild for bundling.
- **Database**: PostgreSQL (Neon serverless) with Drizzle ORM and Drizzle Kit for migrations.

## Key Architectural Decisions & Features
- **Tiered Beta Access Platform**: Discord OAuth authentication required for site access. Users must join Discord community, get beta access until December 2025, then upgrade to $5.89/mo subscription. Complete authorization flow with secure session management.
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

# Recent Changes

## Security & Performance Optimization (October 2025)
**Major Dependency Cleanup**: Removed 171 unused npm packages, reducing total dependencies from 626 to 455 packages.

### Removed Systems & Packages:
- **Authentication System**: Removed legacy Passport.js authentication system (`passport`, `passport-local`, `server/auth.ts`) - platform now exclusively uses Discord OAuth
- **Cloud Storage**: Removed unused Google Cloud Storage (`@google-cloud/storage`, `google-auth-library`)
- **File Upload Libraries**: Removed complete Uppy file upload system (8 packages: `@uppy/core`, `@uppy/dashboard`, `@uppy/aws-s3`, `@uppy/drag-drop`, `@uppy/file-input`, `@uppy/progress-bar`, `@uppy/react`)
- **Unused UI Components**: Removed `react-console-emulator`, `cmdk`, `input-otp`, `react-day-picker`, `embla-carousel-react`, `react-resizable-panels`, `recharts`, `vaul`
- **Utilities**: Removed `next-themes`, `date-fns`, `tw-animate-css`, `@jridgewell/trace-mapping`

### Benefits:
- Reduced attack surface by 27% (171 fewer packages)
- Smaller bundle size and faster build times
- Improved security posture
- Cleaner codebase with only actively used dependencies

### Current Dual Access System:
- **Free Path**: Discord community membership → Platform access
- **Paid Path**: Direct $5.89/mo subscription → Platform access
- Both paths provide beta access until December 6, 2025
- Hamburger menu clearly presents both options to users

## Content Updates (October 2025)
**Landing Page Research Integration**: Transformed generic marketing content into academically accurate claims based on published thesis "Visual Augmentation and Frequency Entrainment for Enhanced Memory Encoding" with exact statistical data (M=38.2 vs 31.5, 47% theta power increase, η²=.304, d=1.34).
**Testimonials Removed**: All testimonial sections removed from landing page per user request.
**Notebook Features Simplified**: Removed all digital logging, tracking, and documentation features from self-report methodology page. Now simply recommends using physical notebook and pen/pencil for private, analog observation keeping.