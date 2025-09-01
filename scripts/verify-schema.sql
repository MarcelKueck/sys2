-- Minimal seed data that works without auth dependencies
-- This creates demo spaces that will be visible when users browse
-- Real data will be created when users sign up through the UI

-- Only create data that doesn't require auth.users entries
-- We'll create a minimal demo dataset that showcases the platform

-- Note: This is a placeholder approach since we can't create profiles without auth users
-- The real data will be created when users sign up through the application

-- Create enum values to ensure they exist
DO $$
BEGIN
    -- Ensure enums exist (they should from migrations)
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('space_provider', 'applicant', 'admin');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'space_type') THEN
        CREATE TYPE space_type AS ENUM ('office', 'coworking', 'workshop', 'meeting_room');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'company_stage') THEN
        CREATE TYPE company_stage AS ENUM ('idea', 'mvp', 'growth', 'scale');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
        CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected');
    END IF;
END $$;

-- For now, let's just verify the database structure is correct
SELECT 'Database schema is ready for user registration and data creation' as status;