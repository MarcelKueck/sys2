# ShareYourSpace MVP Development Prompts

## Context for All Prompts

You are building an MVP for ShareYourSpace, a B2B platform that matches companies with strategic workspace partners. The pilot customer is Pixida, a German Mittelstand innovation consultancy. The platform prioritizes collaboration value over rental income - "the right neighbor is worth more than the highest rent."

## Prompt 1: Project Setup and Database Schema

```
Create a new Next.js 15 application with the following specifications:

Tech Stack:
- Next.js 15 with App Router and TypeScript 5
- Tailwind CSS 4 and shadcn/ui for styling
- Supabase for backend (PostgreSQL, Auth, Storage)
- React Hook Form + Zod for forms
- Biome for linting/formatting

Project Structure:
- Use Yarn 4 with workspace structure
- Create packages: 'next' (main app) and 'supabase' (database)
- Set up Docker Compose for development

Database Schema (PostgreSQL):
1. profiles table:
   - id (uuid, primary key)
   - email (text, unique)
   - role (enum: 'space_provider', 'applicant', 'admin')
   - created_at, updated_at

2. space_providers table:
   - id (uuid, primary key)
   - company_name (text) - "Pixida GmbH"
   - tagline (text)
   - description (text)
   - looking_for (text[])
   - offers (text[])
   - values (text[])
   - projects (jsonb) - array of {title, description, image_url}
   - team_size (integer)
   - founded_year (integer)
   - industry_focus (text[])
   - atmosphere_images (text[])
   - logo_url (text)

3. spaces table:
   - id (uuid, primary key)
   - provider_id (uuid, foreign key)
   - name (text, unique) - e.g., "Innovation Lab Munich", "Collaboration Corner"
   - type (enum: 'office', 'coworking', 'workshop', 'meeting_room')
   - size_sqm (integer)
   - capacity (integer)
   - available_from (date)
   - monthly_price (decimal)
   - amenities (jsonb) - {wifi, parking, kitchen, etc.}
   - images (text[])
   - description (text)
   - location (jsonb) - {address, city, postal_code, lat, lng}

4. applicants table:
   - id (uuid, primary key, references profiles.id)
   - company_name (text)
   - company_stage (enum: 'idea', 'mvp', 'growth', 'scale')
   - team_size (integer)
   - industry (text)
   - description (text)
   - looking_for (text) - what they need from space
   - can_offer (text) - what they bring to the table
   - website (text)
   - linkedin (text)
   - founded_date (date)
   - funding_status (text)
   - tech_stack (text[])
   - ideal_neighbors (text) - description of ideal co-tenants
   - collaboration_interests (text[])
   - images (text[])

5. applications table:
   - id (uuid, primary key)
   - applicant_id (uuid, foreign key)
   - provider_id (uuid, foreign key)
   - interested_spaces (uuid[]) - array of space IDs
   - status (enum: 'pending', 'reviewed', 'shortlisted', 'accepted', 'rejected')
   - match_score (integer, 0-100, generated)
   - match_reasons (jsonb)
   - submitted_at (timestamp)
   - reviewed_at (timestamp)
   - notes (text)

Set up Supabase:
1. Initialize Supabase project
2. Create all tables with proper RLS policies
3. Set up authentication with email/password
4. Configure storage buckets for images
5. Create database functions for match scoring

Initialize the project with:
- Tailwind CSS configured with professional color scheme (blues, grays)
- shadcn/ui with Card, Button, Input, Textarea, Select, Dialog, Tabs components
- Layout structure with responsive design
- TypeScript strict mode enabled
```

## Prompt 2: Pixida Public Profile Page

```
Create the public profile page for Pixida at /providers/pixida with these requirements:

Layout Structure:
1. Hero Section:
   - Full-width atmospheric image background (blurred/overlay)
   - Pixida logo
   - Tagline: "Where Innovation Meets Mittelstand Excellence"
   - Brief description focusing on collaboration

2. About Section (Card Layout):
   - "Who We Are" - Innovation consultancy description
   - "What We Do" - Digital transformation, AI/ML, Mobility solutions
   - "Our Values" - Innovation, Collaboration, Trust, Growth
   - Team size, founded year, location badges

3. Projects Showcase (Horizontal Scroll):
   - Current innovation projects with images
   - "Autonomous Driving Solutions"
   - "Smart Factory Implementation"
   - "Digital Twin Development"

4. What We're Looking For Section:
   - Bullet points of ideal tenants:
     * AI/ML startups in mobility or manufacturing
     * IoT and sensor technology companies
     * Digital transformation consultancies
     * Sustainable tech innovators
   - Collaboration opportunities offered

5. Our Spaces Section (Main Feature):
   - Large card component with navigation arrows
   - Multiple spaces WITHOUT page navigation:
     * "Innovation Lab Munich" - 120sqm open workspace
     * "Collaboration Corner" - 45sqm meeting/workshop space
     * "Tech Sandbox" - 80sqm with hardware lab access
   - Each space card shows:
     * Gallery of 3-4 images
     * Size, capacity, availability
     * Amenities icons (WiFi, Kitchen, Parking, etc.)
     * Monthly price (secondary importance)
     * Special features (3D printer access, etc.)

6. Call-to-Action:
   - Prominent "Join Our Innovation Ecosystem" button
   - Triggers application flow

Styling:
- Professional but approachable
- Use blues (#0066CC) and grays
- Glass morphism effects for cards
- Smooth animations on scroll
- Mobile-first responsive design

Content (use realistic placeholder text for Pixida):
- Focus on Mittelstand innovation culture
- Emphasize collaboration over transaction
- Highlight success stories and partnerships
- Use German business cultural references
```

## Prompt 3: Application Flow - User Profile Creation

```
Create the multi-step application flow that starts when users click "Join Our Innovation Ecosystem":

Step 1: Basic Information (/apply/basic-info)
- Company name (required)
- Your name and role
- Email (for account)
- Password (create account)
- Company website
- LinkedIn profile
- Team size selector (1-5, 6-20, 21-50, 50+)
- Company stage (Idea, MVP, Growth, Scale)

Step 2: About Your Business (/apply/about)
- Company description (rich text, 500 chars min)
- Industry/vertical selector
- Founded date
- Funding status (Bootstrapped, Pre-seed, Seed, Series A+)
- Current location
- Tech stack tags (searchable/selectable)
- Upload company images (logo + 2-3 atmosphere photos)

Step 3: Collaboration Profile (/apply/collaboration)
- "What are you looking for in a workspace?" (textarea)
- "What can you offer to other tenants?" (textarea)
- "Describe your ideal neighbors" (textarea)
- Collaboration interests (checkboxes):
  * Joint product development
  * Skill sharing/workshops
  * Customer referrals
  * Technical partnerships
  * Resource sharing
  * Mentorship exchange

Step 4: Space Selection (/apply/spaces)
- Display Pixida's available spaces as cards
- Multiple selection with checkboxes
- Show match indicators based on profile
- Priority ranking option
- Additional notes field
- Terms acceptance checkbox
- Submit application button

After Submission:
- Confirmation page with next steps
- Email notification to admin
- Redirect to applicant dashboard

Features:
- Progress indicator (steps 1-4)
- Save draft functionality
- Form validation with helpful errors
- Image upload with preview
- Auto-save to localStorage
- Mobile-optimized forms
```

## Prompt 4: Applicant Dashboard

```
Create the applicant dashboard at /dashboard for logged-in users:

Layout:
1. Header with company name and logout
2. Application status card (Pending/Under Review/Shortlisted)
3. Profile sections (all editable):
   - Company information
   - Collaboration profile
   - Uploaded images
   - Space preferences

Features:
- Edit mode for all sections
- Save changes functionality
- Upload/replace images
- View interested spaces
- Application history
- Contact information for questions

Styling:
- Clean, minimal interface
- Clear status indicators
- Edit buttons on hover
- Responsive grid layout
```

## Prompt 5: Admin Dashboard for Manual Matching

```
Create an admin dashboard at /admin (protected route) with:

Main Dashboard (/admin):
1. Statistics Cards:
   - Total applications
   - Pending reviews
   - Average match score
   - Accepted applications

2. Applications Table:
   - Sortable by date, match score, status
   - Quick view of company name, size, industry
   - Status badges (Pending, Reviewed, Shortlisted)
   - Action buttons (View, Shortlist, Reject)

Application Detail View (/admin/applications/[id]):
1. Full applicant profile display
2. Side-by-side comparison with Pixida requirements
3. Match scoring breakdown:
   - Industry alignment (0-25 points)
   - Size compatibility (0-25 points)
   - Collaboration potential (0-25 points)
   - Innovation focus (0-25 points)

4. Manual scoring inputs:
   - Override match score
   - Add internal notes
   - Tag potential synergies

5. Actions:
   - Shortlist for Pixida review
   - Request more information
   - Reject with reason
   - Export to PDF

Matching Queue (/admin/matching):
- Kanban board layout:
  * New Applications
  * Under Review
  * Shortlisted for Pixida
  * Accepted
  * Rejected
- Drag and drop between columns
- Quick filters by space, industry, size

Features:
- Search across all applications
- Bulk actions (shortlist multiple)
- Export shortlist for Pixida
- Email templates for communication
- Basic analytics on match success
```

## Prompt 6: Sample Data and Final Setup

```
Create sample data and finalize the MVP:

Seed Pixida's Profile:
- Company: Pixida GmbH
- 200+ employees, founded 2016
- Focus: Automotive, Manufacturing, Digital Innovation
- Looking for: AI/ML startups, IoT companies, Digital transformation partners
- 3 available spaces with realistic Munich addresses

Create 10 Sample Applications:
1. MotionAI - Autonomous driving startup (High match)
2. GreenFactory - Sustainable manufacturing (High match)
3. DataMesh - IoT analytics platform (Medium match)
4. CloudKitchen - Food delivery startup (Low match)
5. FinFlow - Fintech company (Low match)
6-10. Various industries and stages

Environment Variables (.env.local):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

Final Checklist:
1. Authentication flow working
2. Image uploads functional
3. Form validation complete
4. Responsive on mobile
5. Admin routes protected
6. Database queries optimized
7. Error handling implemented
8. Loading states added
9. SEO meta tags configured
10. Production build successful

Deployment Notes:
- Set up Vercel deployment
- Configure Supabase production
- Enable RLS policies
- Set up backup strategy
```

## Additional Implementation Notes

### Key UI/UX Patterns:
- Use glass morphism for modern feel
- Implement skeleton loaders
- Add smooth scroll animations
- Use Lucide icons consistently
- Implement toast notifications for actions

### Collaboration-Focused Features:
- Highlight potential synergies in UI
- Show "collaboration score" not just price
- Display potential partnership opportunities
- Emphasize community over transaction

### German Market Considerations:
- GDPR-compliant data handling
- German language preparation (i18n ready)
- Formal business communication tone
- Focus on Mittelstand values (trust, quality, long-term relationships)

### Manual Process Integration:
- Admin notes field for human insights
- Email notifications for manual follow-up
- Export functionality for offline review
- Simple CRM-like features for tracking conversations

### Future-Proofing:
- Modular component structure
- API routes prepared for automation
- Database schema supports multiple providers
- Analytics tracking hooks in place

## Execution Order:
1. Run Prompt 1 - Set up project and database
2. Run Prompt 2 - Create Pixida profile page
3. Run Prompt 3 - Build application flow
4. Run Prompt 4 - Create applicant dashboard
5. Run Prompt 5 - Build admin dashboard
6. Run Prompt 6 - Add sample data and deploy

Each prompt builds on the previous one. The agent should create a fully functional MVP that demonstrates the core value proposition: strategic workspace matching that prioritizes collaboration over rent.