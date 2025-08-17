# Overview

BlackRaven OS is a cybersecurity training platform built as a full-stack web application. It provides an interactive terminal-based learning environment where users can access cybersecurity courses through tiered subscriptions. The platform features a dark, terminal-inspired UI with red color theme variants and accessibility features including SVG symbol rendering and shape vectors for color blind users. Includes subscription management through Stripe payments.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with protected route components
- **State Management**: TanStack Query for server state, React Context for authentication
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom terminal/cyber theme variables
- **Forms**: React Hook Form with Zod validation

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
- **Users**: Authentication, subscription tiers (none, recruit, operative, operator, shadow), Stripe integration
- **Courses**: Hierarchical content with difficulty levels and tier requirements
- **Modules**: Course content with JSON-based lesson data
- **Certificates**: Achievement system for completed courses
- **Access Control**: Tier-based access without progress tracking

## Authentication & Authorization
- **Strategy**: Session-based authentication with encrypted passwords (scrypt)
- **Authorization**: Role-based access (admin flag) and subscription tier validation
- **Session Management**: PostgreSQL-backed sessions with configurable expiration
- **Password Security**: Salt-based hashing with timing-safe comparisons

## Payment Integration
- **Provider**: Stripe for subscription management
- **Architecture**: Server-side subscription creation with client-side payment confirmation
- **Flow**: Customer creation → subscription setup → payment intent confirmation
- **Webhook Handling**: Not implemented yet but structured for future webhook processing

## Terminal Emulator
- **Implementation**: React-based terminal simulator with command processing and async buffer switches
- **Features**: Command history, boot sequences, course interaction simulation, database access terminals
- **Theming**: Red color theme with multiple variants (primary, secondary, dark, bright, muted, orange, amber, crimson, scarlet, burgundy)
- **Accessibility**: SVG symbol rendering system with shape vectors for color blind accessibility
- **Interactivity**: Real-time command processing with educational scenarios and database terminal integration

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