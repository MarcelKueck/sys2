# Workspace Matching Platform

A comprehensive Next.js 15 application for connecting innovative companies with perfect workspace partners. Built with modern technologies including Supabase, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript 5, Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Forms**: React Hook Form + Zod validation
- **UI Components**: shadcn/ui with Radix UI primitives
- **Code Quality**: Biome for linting and formatting
- **Package Management**: Yarn 4 with workspace structure
- **Development**: Docker Compose for database

## 📁 Project Structure

```
workspace-matching-platform/
├── packages/
│   ├── next/           # Main Next.js application
│   │   ├── src/
│   │   │   ├── app/    # App Router pages
│   │   │   ├── components/ui/  # Reusable UI components
│   │   │   ├── lib/    # Utility functions and Supabase client
│   │   │   └── types/  # TypeScript type definitions
│   │   └── package.json
│   └── supabase/       # Database schema and configuration
│       ├── init.sql    # Database initialization
│       └── supabase/   # Supabase configuration
└── package.json        # Root package.json
```

## 🗄️ Database Schema

The platform uses a comprehensive PostgreSQL schema with the following main tables:

### Core Tables
- **profiles** - User profiles extending Supabase auth
- **space_providers** - Companies offering workspace (like Pixida GmbH)
- **spaces** - Individual workspace listings
- **applicants** - Companies looking for workspace
- **applications** - Applications from companies to space providers

### Key Features
- Row Level Security (RLS) policies for data protection
- Automatic match scoring algorithm
- JSONB fields for flexible data storage
- Full-text search capabilities
- Automated timestamps and triggers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- Yarn 4

### Installation

1. **Clone and setup the project**
   ```bash
   git clone <repository-url>
   cd workspace-matching-platform
   yarn install
   ```

2. **Start the development database**
   ```bash
   yarn db:start
   ```

3. **Initialize Supabase (first time only)**
   ```bash
   cd packages/supabase
   npx supabase init
   npx supabase start
   ```

4. **Run the development server**
   ```bash
   yarn dev
   ```

5. **Access the application**
   - Application: http://localhost:3000
   - Supabase Studio: http://localhost:54323
   - Database: http://localhost:54322

## 🎯 Key Features

### For Space Providers (e.g., Pixida GmbH)
- **Workspace Management**: Add and manage multiple workspace listings
- **Application Review**: Review applications with AI-powered match scoring
- **Company Profiles**: Showcase company culture, values, and projects
- **Smart Matching**: Algorithm matches based on industry, team size, and values

### For Applicants
- **Space Discovery**: Browse and filter available workspaces
- **Smart Applications**: Apply to multiple spaces with intelligent matching
- **Profile Building**: Detailed company profiles with tech stack and collaboration interests
- **Match Insights**: See why you're a good fit for specific providers

### Platform Features
- **Authentication**: Secure email/password authentication via Supabase
- **Real-time Updates**: Live notifications for applications and messages
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript coverage with generated database types

## 🔧 Development Commands

```bash
# Development
yarn dev                 # Start development server
yarn build              # Build for production
yarn start              # Start production server

# Code Quality
yarn lint               # Run Biome linter
yarn format             # Format code with Biome
yarn type-check         # TypeScript type checking

# Database
yarn db:start           # Start PostgreSQL with Docker
yarn db:stop            # Stop database
yarn db:reset           # Reset database with fresh schema
```

## 🏗️ Architecture

### Frontend Architecture
- **App Router**: Uses Next.js 15 App Router for improved performance
- **Server Components**: Leverage server components for data fetching
- **Client Components**: Interactive components marked with "use client"
- **Middleware**: Authentication middleware for protected routes

### Database Architecture
- **Supabase**: Provides PostgreSQL database, authentication, and real-time subscriptions
- **RLS Policies**: Row-level security ensures users only access their data
- **Triggers**: Automatic timestamp updates and match score calculations
- **Functions**: PostgreSQL functions for complex business logic

### Styling Architecture
- **Tailwind CSS 4**: Latest version with improved performance
- **shadcn/ui**: High-quality, accessible component library
- **Design System**: Consistent color scheme and typography
- **Responsive**: Mobile-first approach with professional aesthetics

## 🔐 Environment Variables

Create a `.env.local` file in `packages/next/`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/workspace_matching
```

## 👨‍💼 Admin Management

The platform includes a comprehensive admin dashboard for managing applications, users, and analytics.

### Admin Dashboard Features

- **Statistics Overview**: Real-time platform metrics and KPIs
- **Applications Management**: View, filter, and manage all applications with advanced search
- **Detailed Application Views**: Complete application details with match scoring breakdown
- **Kanban Matching Queue**: Visual workflow management (New → Under Review → Shortlisted → Accepted/Rejected)
- **Analytics Dashboard**: Performance metrics, charts, and data insights
- **Settings Panel**: Platform configuration and admin tools

### Creating Admin Accounts

#### Method 1: API Endpoint (Recommended)
Use the admin creation API endpoint with the admin secret:

```bash
curl -X POST http://localhost:3000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@workspacematching.com",
    "password": "your-secure-password",
    "adminSecret": "ADMIN_SECRET_2024"
  }'
```

#### Method 2: Database Direct Access
If you have direct database access, you can create admin accounts manually:

```sql
-- First, create the auth user (use Supabase Auth)
-- Then create the profile record:
INSERT INTO public.profiles (id, email, role, created_at, updated_at) 
VALUES (
  'auth-user-id-here',
  'admin@example.com', 
  'admin', 
  NOW(), 
  NOW()
);
```

### Admin Access

1. **Login**: Use admin credentials at `/auth/signin`
2. **Dashboard**: Access admin features via the "Admin Panel" button in the dashboard header
3. **Direct Access**: Navigate to `/admin` for the full admin dashboard

### Admin Security

- Admin routes are protected by middleware authentication
- Role-based access control ensures only admin users can access admin features
- Admin account creation requires a secret key for security
- All admin actions are logged and auditable

**Note**: The admin secret (`ADMIN_SECRET_2024`) should be changed in production and stored securely.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pixida GmbH** - Primary space provider and inspiration
- **Supabase** - Backend infrastructure and database
- **Vercel** - Deployment platform
- **shadcn/ui** - Component library foundation
