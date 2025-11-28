# Pure Trading - Forex Trading Signals Platform

## Overview

Pure Trading is a forex trading signals platform that provides daily trading signals, educational resources, and market analysis to help traders pass propfirm evaluations and achieve consistent profits. The platform delivers signals across major instruments (FX, Gold, Silver, Crypto) covering Asian, London, and New York trading sessions via Telegram, with a focus on professional risk management and detailed trade rationale.

The application features a public landing page showcasing the service offering and a members-only dashboard for authenticated users to access signals, ebooks, and trading resources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, built using Vite for fast development and optimized production builds.

**Routing**: Wouter for lightweight client-side routing with two main routes:
- Landing page (`/`) for unauthenticated users
- Dashboard (`/dashboard`) for authenticated members

**UI Component System**: Shadcn/ui (New York style variant) providing a comprehensive set of accessible, customizable components built on Radix UI primitives. The design system uses:
- Tailwind CSS for styling with a custom fintech-focused theme
- CSS variables for theming (supports dark/light modes)
- Typography hierarchy using Inter (primary), Space Grotesk (headings)
- Consistent spacing primitives (4, 8, 12, 16, 24px units)

**State Management**: 
- TanStack Query (React Query) for server state management with infinite stale time and disabled refetching
- React Context for theme management (dark/light mode toggle)
- Local state for UI interactions

**Design Philosophy**: Reference-based design inspired by fintech platforms (specifically Funding Pips), emphasizing trust, professionalism, and data-driven trading signals with gradient mesh backgrounds and elevation-based depth system.

### Backend Architecture

**Server Framework**: Express.js with TypeScript running in ESM mode.

**Authentication**: Replit's OpenID Connect (OIDC) authentication using Passport.js strategy:
- Session-based authentication with PostgreSQL session storage
- Tokens automatically refreshed when expired
- Protected routes using `isAuthenticated` middleware
- User profile data synchronized with local database

**API Structure**: RESTful endpoints under `/api` prefix:
- `GET /api/auth/user` - Fetch authenticated user profile
- `GET /api/signals` - List all trading signals
- `GET /api/signals/:id` - Get specific signal details
- `POST /api/signals` - Create new signal (authenticated)

All API routes are protected and require authentication. Responses are JSON with comprehensive error handling and logging.

**Data Access Layer**: Storage abstraction (`IStorage` interface) implemented by `DatabaseStorage` class, providing clean separation between business logic and database operations. All database queries use Drizzle ORM for type-safe database access.

### Database Schema

**ORM**: Drizzle ORM with Neon serverless PostgreSQL driver over WebSockets.

**Core Tables**:

1. **sessions** - Express session storage for authentication
   - `sid` (primary key), `sess` (JSONB), `expire` (timestamp)

2. **users** - User profiles from Replit Auth
   - UUID primary key, email, name fields, profile image
   - `isMember` boolean for membership status
   - `membershipStartDate` for tracking access
   - Timestamps for created/updated

3. **signals** - Trading signals with full trade details
   - UUID primary key
   - Trading pair (instrument), direction (buy/sell)
   - Entry points, stop loss, take profit levels (TP1, TP2, TP3)
   - Lot size recommendation
   - Trade rationale (why the trade was taken)
   - Status (active/closed/cancelled)
   - Result tracking (which TP hit or SL)
   - Session classification (Asian/London/NY)
   - Timestamps for creation/updates

4. **memberships** - Payment and subscription tracking
   - Links to users table
   - Plan name, amount, currency (INR)
   - Payment gateway ID reference
   - Status tracking

5. **economicEvents** - Economic calendar data
   - Currency, event name, impact level
   - Forecast vs previous values
   - Event timing

6. **marketAnalysis** - Daily/weekly market analysis posts
   - Instrument, timeframe, analysis content
   - Author reference

**Relations**: One-to-many relationships between users and memberships. Schema uses Drizzle relations API for type-safe joins.

### Build System

**Development**: TSX for running TypeScript server with hot reload, Vite dev server with HMR for client.

**Production Build**: Custom build script (`script/build.ts`) that:
1. Clears dist directory
2. Builds client with Vite (outputs to `dist/public`)
3. Builds server with esbuild, bundling allowlisted dependencies to reduce cold start syscalls
4. Generates single `dist/index.cjs` file

**Bundling Strategy**: Server dependencies are either bundled (for faster cold starts) or marked as external. Allowlist includes database drivers, authentication libraries, and core dependencies.

## External Dependencies

### Third-Party Services

1. **Replit Authentication** (`@replit/vite-plugin-*`)
   - OIDC provider for user authentication
   - Automatic session management
   - User profile synchronization

2. **Neon Database** (`@neondatabase/serverless`)
   - Serverless PostgreSQL over WebSockets
   - Connection pooling via `pg` Pool
   - Configured via `DATABASE_URL` environment variable

3. **Telegram** (Integration planned)
   - Signal delivery mechanism
   - Real-time notifications
   - Private channel access for members

### Key NPM Packages

**UI & Styling**:
- `tailwindcss` - Utility-first CSS framework
- `@radix-ui/*` - Accessible UI component primitives (20+ components)
- `class-variance-authority` - Type-safe variant API for components
- `lucide-react` - Icon library
- `react-icons` - Additional icons (Telegram, Bitcoin, etc.)

**Forms & Validation**:
- `react-hook-form` - Performant form state management
- `zod` - TypeScript-first schema validation
- `drizzle-zod` - Auto-generate Zod schemas from Drizzle tables
- `@hookform/resolvers` - Zod integration for react-hook-form

**Data Fetching**:
- `@tanstack/react-query` - Async state management
- `axios` - HTTP client (if needed for external APIs)

**Authentication**:
- `passport` + `passport-local` - Authentication middleware
- `openid-client` - OIDC client for Replit Auth
- `express-session` - Session management
- `connect-pg-simple` - PostgreSQL session store

**Database**:
- `drizzle-orm` - TypeScript ORM
- `drizzle-kit` - Schema migrations and push
- `pg` (via Neon) - PostgreSQL driver

**Utilities**:
- `date-fns` - Date formatting and manipulation
- `nanoid` - Unique ID generation
- `memoizee` - Function memoization for OIDC config
- `ws` - WebSocket client for Neon connection

### Environment Variables Required

- `DATABASE_URL` - Neon PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `REPL_ID` - Replit application identifier
- `ISSUER_URL` - OIDC issuer URL (defaults to replit.com/oidc)

### API Integrations (Planned)

- Payment gateway for membership subscriptions (₹9 promotional offer)
- Economic calendar API for fetching forex news events
- Telegram Bot API for signal delivery