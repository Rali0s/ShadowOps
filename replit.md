# Overview

_Fq is a brainwave frequency analysis training platform built as a full-stack web application. It provides an interactive terminal-based learning environment where users can access frequency training across Alpha (8-12 Hz), Beta (12-30 Hz), Theta (4-8 Hz), and Gamma (30-100+ Hz) frequencies through open access. The platform features a dark, terminal-inspired UI with red color theme variants, custom frequency logo, and revolutionary sacred geometry auto-wheel visualization. The sacred geometry wheel features 13 alternating circles in elliptical patterns with complex triangular shapes in varying directions, broader complex shapes between cross sections, and high-speed rotation synchronized with brainwave frequencies for neural synchronization.

# User Preferences

Preferred communication style: Simple, everyday language.
Navigation preferences: Removed courses tab from navigation system per user request.
System architecture: Completely removed course system - platform now uses pure tier-based access only with brainwave frequency training (Alpha, Beta, Theta, Gamma).
Authentication system: REMOVED - User requested "repair auth section - no auth or logins needed" - Platform now operates as open access system without user authentication or login requirements.
Sacred geometry visualization: ADDED - User requested red-based sacred geometry auto-wheel with high-speed elliptical patterns, 13 alternating circles with complex triangles and varying directional shapes, broader complex shapes between cross sections for future self-programming goals integration.

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
- **Features**: Command history, boot sequences, brainwave frequency training simulation, database access terminals, frequency analysis display, sacred geometry wheel activation commands
- **Theming**: Pure red color theme with traditional red shades (primary, secondary, dark, bright, muted, scarlet, crimson, burgundy)
- **Accessibility**: SVG symbol rendering system with shape vectors for color blind accessibility
- **Interactivity**: Real-time command processing with educational scenarios and database terminal integration
- **Sacred Geometry Commands**: Terminal commands include 'sacred', 'geomatry', 'wheel [freq]', and 'elliptic' for activating the sacred geometry auto-wheel with frequency synchronization
- **Responsive Design**: Fully responsive terminal interfaces with mobile-optimized layouts, touch-friendly controls, and adaptive text sizing

## Sacred Geometry Auto-Wheel
- **Design**: Red-based sacred geometry visualization with 13 alternating circles in elliptical patterns
- **Animation**: High-speed rotation with elliptical warning mode (1.2x horizontal, 0.8x vertical distortion)
- **Patterns**: Complex triangular shapes in varying directions, alternating between polygons and concentric circles
- **Cross-Sectional Elements**: Broader complex shapes drawn between circle intersections using curved paths and mathematical patterns
- **Brainwave Synchronization**: Wheel speed and intensity synchronized to current brainwave frequency (Alpha, Beta, Theta, Gamma)
- **Interactive Commands**: Terminal-activated visualization with frequency-specific parameters and warning overlays
- **Future Integration**: Designed for self-programming goals computation and advanced neural feedback

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