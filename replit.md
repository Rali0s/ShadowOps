# Overview

_Fq is a brainwave frequency analysis training platform built as a full-stack web application integrating psychological programming elements from "Knot-So-lution Programming" study with a thematic backstory of infiltrating Blackbriar through age falsification to acquire classified manuals before public release. The platform provides an interactive terminal-based learning environment where users can access frequency training across Alpha (8-12 Hz), Beta (12-30 Hz), Theta (4-8 Hz), and Gamma (30-100+ Hz) frequencies through open access. The platform features psychological programming capabilities including Education of Ops Manuals, Anchor/Knot/TieDown Triggers, visual recall operations, and Blackbriar infiltration archives showcasing the evolution from classified military techniques to beneficial civilian cognitive enhancement.

# User Preferences

Preferred communication style: Simple, everyday language.
Navigation preferences: Removed courses tab from navigation system per user request.
System architecture: Completely removed course system - platform now uses pure tier-based access only with brainwave frequency training (Alpha, Beta, Theta, Gamma).
Authentication system: REMOVED - User requested "repair auth section - no auth or logins needed" - Platform now operates as open access system without user authentication or login requirements.
Sacred geometry visualization: ADDED - User requested red-based sacred geometry auto-wheel with high-speed elliptical patterns, 13 alternating circles with complex triangles and varying directional shapes, broader complex shapes between cross sections for future self-programming goals integration.
Psychological programming integration: ADDED - Full integration of "Knot-So-lution Programming" study with Education of Ops Manuals, Trigger-Anchor-Knot system, psychological schema operations (A, B, C types), and visual recall operations with "PRODUCT OF A MAD MAN" disclaimer warnings.
Blackbriar backstory integration: ADDED - Thematic narrative of infiltrating Blackbriar through age falsification, acquiring classified psychological programming manuals before public release, with full declassified document archives showing evolution from military psychological warfare to civilian cognitive enhancement platform.
KSP Dossier integration: ADDED - Complete Knot Solution Programming dossier with full technical specifications, 10-section classified documentation, agency seal with sacred geometry, brainwave state definitions, schema design protocols, operational frameworks, risk assessments, and publishing pathways with "Product of A Mad Man" disclaimer system.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with protected route components
- **State Management**: TanStack Query for server state, React Context for authentication
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom terminal/cyber theme variables and full responsive design
- **Forms**: React Hook Form with Zod validation
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint system

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Authentication**: Passport.js with local strategy using session-based auth
- **Session Storage**: PostgreSQL session store with express-session
- **API Design**: RESTful endpoints with middleware for logging and error handling
- **Build Process**: ESBuild for production bundling

## Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema migrations
- **Connection**: Connection pooling with @neondatabase/serverless

## Database Schema
- **Users**: Authentication, subscription tiers (none, alpha, beta, theta, gamma), Stripe integration
- **Courses**: Hierarchical content with difficulty levels and tier requirements
- **Modules**: Course content with JSON-based lesson data
- **Certificates**: Achievement system for completed courses
- **Access Control**: Open access to all brainwave frequency bands without restrictions (Alpha: 8-12 Hz, Beta: 12-30 Hz, Theta: 4-8 Hz, Gamma: 30-100+ Hz)

## Authentication & Authorization
- **Status**: REMOVED - Open access platform
- **Access Control**: All functionality available without authentication
- **Previous System**: Session-based authentication was removed per user request
- **Current Model**: No login, registration, or user management required

## Payment Integration
- **Provider**: Stripe for subscription management
- **Architecture**: Server-side subscription creation with client-side payment confirmation
- **Flow**: Customer creation → subscription setup → payment intent confirmation
- **Webhook Handling**: Not implemented yet but structured for future webhook processing

## Terminal Emulator
- **Implementation**: React-based terminal simulator with command processing and async buffer switches
- **Features**: Command history, boot sequences, brainwave frequency training simulation, database access terminals, frequency analysis display, sacred geometry wheel activation commands, psychological programming commands
- **Theming**: Pure red color theme with traditional red shades (primary, secondary, dark, bright, muted, scarlet, crimson, burgundy)
- **Accessibility**: SVG symbol rendering system with shape vectors for color blind accessibility
- **Interactivity**: Real-time command processing with educational scenarios and database terminal integration
- **Sacred Geometry Commands**: Terminal commands include 'sacred', 'geomatry', 'wheel [freq]', and 'elliptic' for activating the sacred geometry auto-wheel with frequency synchronization
- **Psychological Programming Commands**: New commands include 'anchor', 'trigger', 'tiedown', 'schema [A|B|C]', and 'knot' for Jason Bourne-like trigger system activation and MK-Ultra methodology implementation
- **Blackbriar Infiltration Commands**: Commands include 'blackbriar', 'treadstone', and 'infiltrate' for accessing classified document archives and backstory narrative
- **KSP Dossier Commands**: Commands include 'ksp', 'dossier', and 'classify' for accessing Knot Solution Programming documentation with complete technical specifications and risk assessments
- **Responsive Design**: Fully responsive terminal interfaces with mobile-optimized layouts, touch-friendly controls, and adaptive text sizing

## Sacred Geometry Auto-Wheel
- **Design**: Red-based sacred geometry visualization with 13 alternating circles in elliptical patterns
- **Animation**: High-speed rotation with elliptical warning mode (1.2x horizontal, 0.8x vertical distortion)
- **Patterns**: Complex triangular shapes in varying directions, alternating between polygons and concentric circles
- **Cross-Sectional Elements**: Broader complex shapes drawn between circle intersections using curved paths and mathematical patterns
- **Brainwave Synchronization**: Wheel speed and intensity synchronized to current brainwave frequency (Alpha, Beta, Theta, Gamma)
- **Interactive Commands**: Terminal-activated visualization with frequency-specific parameters and warning overlays
- **Psychological Programming Integration**: Sacred geometry wheel serves as visual anchor for psychological programming operations, synchronized with trigger-anchor-knot system

## Psychological Programming System
- **Ops Manual System**: Comprehensive education of psychological operations with schema types A (1hr), B (24hr), C (1week)
- **Trigger-Anchor-Knot System**: Interactive Jason Bourne-like trigger system with visual, audio, and tactile anchors
- **Schema Operations**: Theta level induction, flow state operations, and advanced psychological programming with MK-Ultra methodology
- **Tiedown Protocols**: Cognitive dissonance prevention system with reality grounding and sanity check procedures
- **Visual Recall Operations**: Integration of sacred geometry wheel with psychological anchoring mechanisms
- **Warning Systems**: "PRODUCT OF A MAD MAN" disclaimers with cognitive dissonance warnings and magical thinking issue alerts

## Blackbriar Infiltration Narrative
- **Backstory Integration**: Thematic story of infiltrating Blackbriar facility through age falsification to acquire classified psychological programming manuals
- **Document Archives**: Full declassified document system showcasing formerly TOP SECRET materials from Blackbriar, Treadstone, and Outcome programs  
- **Evolution Narrative**: Military psychological warfare techniques evolved into beneficial civilian cognitive enhancement and brainwave frequency training
- **Clearance System**: Progressive document unlock system with theta state memory recall synchronization using sacred geometry wheel
- **Mission Phases**: Three-phase infiltration story (False Documentation → Deep Learning → Evolution) integrated throughout platform experience

## KSP Dossier System
- **Complete Documentation**: 10-section classified dossier with full Knot Solution Programming technical specifications
- **Agency Seal Integration**: KSP agency seal with central knot symbol, sacred geometry wheel, and circular flow enclosure
- **Classification System**: Internal/Restricted classification with security clearance verification and risk level indicators (Low, Medium, High, Extreme)
- **Technical Specifications**: Comprehensive brainwave state definitions, schema design protocols, operational frameworks, and materials/tools requirements
- **Risk Assessment Framework**: Extreme risk warnings for cognitive dissonance, magical thinking, anchor dependency, and MK-Ultra ethical parallels
- **Publishing Pathways**: Academic publication routes through PsychINFO, PsychDB, Psychology Today, with confidential circulation options
- **Disclaimer System**: "Product of A Mad Man" and "Psychology Degree Minus Math Prerequisites" integrated throughout documentation

# External Dependencies

## Payment Processing
- **Stripe**: Complete payment infrastructure including customer management, subscriptions, and payment intents
- **Integration**: Both client-side (@stripe/stripe-js, @stripe/react-stripe-js) and server-side (stripe) SDKs

## Database Services  
- **Neon Database**: PostgreSQL-compatible serverless database with WebSocket support
- **Connection**: Serverless-optimized connection pooling and management

## UI Framework
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **shadcn/ui**: Pre-built component library with consistent design system
- **Tailwind CSS**: Utility-first CSS framework with custom red theme design tokens
- **SVG Symbols**: Custom SVG rendering system for terminal symbols with accessibility features
- **Color Accessibility**: Red theme variants with shape vector indicators for color blind users

## Development Tools
- **Vite**: Fast development server with HMR and optimized production builds  
- **TypeScript**: Full-stack type safety with shared schema definitions
- **Replit Integration**: Development environment optimization with runtime error handling

## Form Handling
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation with TypeScript integration
- **@hookform/resolvers**: Bridge between React Hook Form and Zod validation