# bunnycode.ai - AI Automation Agency Platform

## Overview

bunnycode.ai is a marketing website and lead capture platform for an AI automation agency. The application features a minimal, futuristic design with cyberpunk aesthetics inspired by o.xyz, showcasing services for AI-native automation solutions targeting sales workflows, internal operations, and content systems. The site includes a functional contact form with database-backed lead storage. The application is built as a modern React SPA with a focus on visual effects like glitch animations, chromatic aberration, and matrix-style design elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing (single-page application)
- React Query (@tanstack/react-query) for server state management

**UI Component Library**
- shadcn/ui component system (New York style variant) built on Radix UI primitives
- Comprehensive set of accessible, customizable components (40+ components including dialogs, dropdowns, forms, navigation, etc.)
- Component aliases configured for clean imports (@/components, @/lib, @/hooks)

**Styling System**
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theme customization (light/dark mode support built-in)
- Custom color palette with HSL color format for programmatic theming
- Typography system using Inter (body), Space Grotesk (headings), and Space Mono (monospace)
- Custom spacing scale and border radius values for consistent design rhythm

**Design Implementation**
- Minimal, high-contrast aesthetic with sci-fi/cyberpunk elements
- Visual effects: glitch animations, chromatic aberration, scanlines, matrix-style backgrounds
- Reference-based design following o.xyz's futuristic approach
- Component-based layout with hero section, service cards, timeline, and showcase areas

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server with TypeScript
- Separate entry points for development (index-dev.ts) and production (index-prod.ts)
- Development mode integrates Vite middleware for SSR-like development experience
- Production mode serves pre-built static assets from dist/public

**Development vs Production**
- Development: Vite dev server with middleware mode, live reload, and error overlays
- Production: Static file serving with SPA fallback to index.html for client-side routing
- Custom logging system with timestamp formatting for request tracking
- Request duration monitoring for API endpoints

**API Structure**
- RESTful API design with /api prefix for all backend routes
- Route registration system in registerRoutes function
- Storage abstraction layer (IStorage interface) for data operations
- Currently implements in-memory storage (MemStorage) for user data

### Data Storage

**Database Setup - Supabase Integration**
- **Supabase** as the primary database (PostgreSQL-based with real-time capabilities)
- Supabase client library (@supabase/supabase-js) for database operations
- Credentials stored securely in Replit Secrets (SUPABASE_URL, SUPABASE_ANON_KEY)
- Centralized client configuration in shared/supabase.ts

**Current Schema**
- **Leads table**: Contact form submissions with the following fields:
  - id (bigserial, auto-generated primary key)
  - name, email, phone (required text fields)
  - socials (optional text field for social media handles)
  - project_type (required - maps from projectType in frontend)
  - description (required text field)
  - extra_info (optional - maps from extraInfo in frontend)
  - created_at (timestamp with timezone, auto-generated)
- Row Level Security (RLS) enabled with public insert and read policies

**Storage Pattern**
- Direct Supabase client usage via `supabase.from('leads').insert()`
- Type-safe Lead type definition in shared/supabase.ts
- API routes handle field name mapping (camelCase frontend → snake_case database)
- Error handling for both Supabase-specific and general server errors

**Supabase Features Available**
- Real-time subscriptions for live data updates
- Built-in authentication system (not yet implemented)
- File storage capabilities (not yet implemented)
- Row Level Security for fine-grained access control

### External Dependencies

**UI & Component Libraries**
- Radix UI: Accessible component primitives (20+ packages for dialogs, dropdowns, navigation, etc.)
- shadcn/ui: Pre-built component system configured with New York style
- class-variance-authority (CVA): Type-safe variant styling
- cmdk: Command palette component
- embla-carousel-react: Carousel functionality
- lucide-react: Icon library

**Forms & Validation**
- react-hook-form: Form state management
- @hookform/resolvers: Validation resolver integration
- zod: Schema validation (integrated with Drizzle for database schemas)

**Database & ORM**
- @supabase/supabase-js: Supabase client for PostgreSQL database operations, real-time, auth, and storage
- drizzle-orm: TypeScript ORM with type-safe queries (legacy - replaced by Supabase)
- drizzle-kit: Schema management and migrations (legacy)
- @neondatabase/serverless: Serverless PostgreSQL driver (legacy)
- connect-pg-simple: PostgreSQL session store (for future session management)

**Utilities**
- date-fns: Date manipulation
- clsx + tailwind-merge: Conditional className utilities
- nanoid: Unique ID generation

**Development Tools**
- @replit/vite-plugin-runtime-error-modal: Development error overlay
- @replit/vite-plugin-cartographer: Replit-specific development tooling
- @replit/vite-plugin-dev-banner: Development environment indicator
- tsx: TypeScript execution for development server

**Build & Tooling**
- TypeScript with strict mode enabled
- ESBuild for production server bundling
- PostCSS with Tailwind and Autoprefixer
- Path aliases configured (@, @shared, @assets) for clean imports