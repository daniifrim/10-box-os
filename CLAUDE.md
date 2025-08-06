# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

10-box OS is a web application implementing a proprietary business framework for client acquisition and management. It's a single-tenant SaaS platform designed for one teacher to oversee multiple consultants using the 10-box methodology.

## Commands

### Development
```bash
# Install dependencies
cd nextjs && npm install

# Run development server (usually already running)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

### Supabase Management
```bash
# Link to Supabase project (requires database password)
npx supabase link

# Push configuration changes
npx supabase config push

# Run migrations
npx supabase migrations up --linked

# Generate types from database
npx supabase gen types typescript --linked > nextjs/src/lib/database.types.ts
```

## Architecture

### Tech Stack
- **Frontend**: Next.js 15 (App Router) with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL with Row Level Security)
- **Deployment**: Vercel (frontend), Supabase (backend/database)
- **Authentication**: Supabase Auth with MFA support

### Key Design Patterns

1. **Supabase Client Management**: Three client types in `src/lib/supabase/`:
   - `client.ts`: Browser client for frontend operations
   - `server.ts`: Server client for SSR and API routes
   - `serverAdminClient.ts`: Admin client with service role key for privileged operations

2. **Row Level Security (RLS)**: All database tables use RLS policies to isolate data between users. Teacher sees all consultant data, consultants see only their own data, clients see only their portal data.

3. **Component Architecture**: 
   - Page components in `src/app/` follow Next.js App Router conventions
   - Shared components in `src/components/` with shadcn/ui base components in `ui/`
   - Layout components handle authentication and role-based access

## Business Logic

### User Hierarchy
1. **Teacher** (single instance): Oversees all consultants, monitors Box 2-4 daily tasks
2. **Consultants**: Work independently with their own Dream 100 prospects and clients
3. **Clients**: View-only access to their service portals after converting from prospects

### 10-Box Framework
- **Boxes 2-4** (Client Acquisition - tracked daily):
  - Box 2 (Identify): 5 avatar refinement tasks
  - Box 3 (Invite): 5 Dream 100 outreach tasks  
  - Box 4 (Converse): 5 conversation/decision tasks
- **Boxes 5-7** (Client Service): Onboarding, delivery with milestones, recap
- **Boxes 8-10** (Client Retention): Future scope

### Critical Workflows

1. **Prospect → Client Conversion**: When Dream 100 contact status = "Buy", automatically:
   - Create client portal
   - Send magic link authentication email
   - Generate service milestones from template (1-day, 5-day, 30-day, or retainer)

2. **Daily Task Tracking**: Color indicators on teacher dashboard:
   - 🟢 Green: All tasks complete
   - 🟡 Yellow: Some incomplete (<3 days)
   - 🔴 Red: Multiple overdue (>3 days)

## Database Schema Considerations

- User roles stored in Supabase Auth metadata
- Dream 100 contacts linked to consultant user ID
- Client portals linked to both consultant and client
- Task completion tracked with timestamps for daily monitoring
- File storage in Supabase Storage buckets with RLS policies

## Testing Approach

Since there's no test framework configured yet, when implementing features:
1. Test authentication flows manually with different user roles
2. Verify RLS policies work correctly (data isolation)
3. Test the critical prospect → client conversion workflow
4. Ensure daily task tracking updates properly on teacher dashboard

## Security Notes

- Never expose service role key to frontend
- All client operations must use RLS-protected queries
- Magic links for client authentication (no passwords)
- MFA available for consultant/teacher accounts
- File uploads restricted by size (5MB) and type (PDF for documents)

## Development Tips

- The dev server is usually already running, check before starting a new one
- Always update `/docs/CHANGELOG.md` before committing changes
- Use existing shadcn/ui components from `src/components/ui/` before creating new ones
- Follow the established pattern for Supabase client usage based on context (browser vs server)
- When modifying database schema, create a new migration file in `supabase/migrations/`
