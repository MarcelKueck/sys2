-- Database Schema for Workspace Matching Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE user_role AS ENUM ('space_provider', 'applicant', 'admin');

CREATE TYPE space_type AS ENUM ('office', 'coworking', 'workshop', 'meeting_room');

CREATE TYPE company_stage AS ENUM ('idea', 'mvp', 'growth', 'scale');

CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'applicant',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Space Providers table
CREATE TABLE space_providers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    company_name TEXT NOT NULL DEFAULT 'Pixida GmbH',
    tagline TEXT,
    description TEXT,
    looking_for TEXT[],
    offers TEXT[],
    values TEXT[],
    projects JSONB DEFAULT '[]'::jsonb,
    team_size INTEGER,
    founded_year INTEGER,
    industry_focus TEXT[],
    atmosphere_images TEXT[],
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Spaces table
CREATE TABLE spaces (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    provider_id UUID REFERENCES space_providers(id) ON DELETE CASCADE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    type space_type NOT NULL,
    size_sqm INTEGER,
    capacity INTEGER,
    available_from DATE,
    monthly_price DECIMAL(10,2),
    amenities JSONB DEFAULT '{}'::jsonb,
    images TEXT[],
    description TEXT,
    location JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Applicants table
CREATE TABLE applicants (
    id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    company_name TEXT,
    company_stage company_stage,
    team_size INTEGER,
    industry TEXT,
    description TEXT,
    looking_for TEXT,
    can_offer TEXT,
    website TEXT,
    linkedin TEXT,
    founded_date DATE,
    funding_status TEXT,
    tech_stack TEXT[],
    ideal_neighbors TEXT,
    collaboration_interests TEXT[],
    images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Applications table
CREATE TABLE applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    applicant_id UUID REFERENCES applicants(id) ON DELETE CASCADE NOT NULL,
    provider_id UUID REFERENCES space_providers(id) ON DELETE CASCADE NOT NULL,
    interested_spaces UUID[],
    status application_status DEFAULT 'pending' NOT NULL,
    match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
    match_reasons JSONB DEFAULT '{}'::jsonb,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_profiles_role ON profiles (role);

CREATE INDEX idx_spaces_provider_id ON spaces (provider_id);

CREATE INDEX idx_spaces_type ON spaces(type);

CREATE INDEX idx_applications_applicant_id ON applications (applicant_id);

CREATE INDEX idx_applications_provider_id ON applications (provider_id);

CREATE INDEX idx_applications_status ON applications (status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_space_providers_updated_at BEFORE UPDATE ON space_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spaces_updated_at BEFORE UPDATE ON spaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applicants_updated_at BEFORE UPDATE ON applicants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE space_providers ENABLE ROW LEVEL SECURITY;

ALTER TABLE spaces ENABLE ROW LEVEL SECURITY;

ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR
SELECT USING (auth.uid () = id);

CREATE POLICY "Users can update their own profile" ON profiles FOR
UPDATE USING (auth.uid () = id);

CREATE POLICY "Admins can view all profiles" ON profiles FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM profiles
            WHERE
                id = auth.uid ()
                AND role = 'admin'
        )
    );

-- Space providers policies
CREATE POLICY "Space providers can view their own data" ON space_providers FOR
SELECT USING (profile_id = auth.uid ());

CREATE POLICY "Space providers can update their own data" ON space_providers FOR
UPDATE USING (profile_id = auth.uid ());

CREATE POLICY "Authenticated users can view space providers" ON space_providers FOR
SELECT USING (
        auth.role () = 'authenticated'
    );

CREATE POLICY "Admins can view all space providers" ON space_providers FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM profiles
            WHERE
                id = auth.uid ()
                AND role = 'admin'
        )
    );

-- Spaces policies
CREATE POLICY "Space providers can manage their spaces" ON spaces FOR ALL USING (
    provider_id IN (
        SELECT id
        FROM space_providers
        WHERE
            profile_id = auth.uid ()
    )
);

CREATE POLICY "Authenticated users can view spaces" ON spaces FOR
SELECT USING (
        auth.role () = 'authenticated'
    );

-- Applicants policies
CREATE POLICY "Applicants can view their own data" ON applicants FOR
SELECT USING (auth.uid () = id);

CREATE POLICY "Applicants can insert their own data" ON applicants FOR
INSERT
WITH
    CHECK (auth.uid () = id);

CREATE POLICY "Applicants can update their own data" ON applicants FOR
UPDATE USING (auth.uid () = id);

CREATE POLICY "Space providers can view applicants" ON applicants FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM space_providers
            WHERE
                profile_id = auth.uid ()
        )
    );

CREATE POLICY "Admins can view all applicants" ON applicants FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM profiles
            WHERE
                id = auth.uid ()
                AND role = 'admin'
        )
    );

-- Applications policies
CREATE POLICY "Applicants can view their applications" ON applications FOR
SELECT USING (applicant_id = auth.uid ());

CREATE POLICY "Applicants can create applications" ON applications FOR
INSERT
WITH
    CHECK (applicant_id = auth.uid ());

CREATE POLICY "Space providers can view applications to their spaces" ON applications FOR
SELECT USING (
        provider_id IN (
            SELECT id
            FROM space_providers
            WHERE
                profile_id = auth.uid ()
        )
    );

CREATE POLICY "Space providers can update applications to their spaces" ON applications FOR
UPDATE USING (
    provider_id IN (
        SELECT id
        FROM space_providers
        WHERE
            profile_id = auth.uid ()
    )
);

CREATE POLICY "Admins can view all applications" ON applications FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM profiles
            WHERE
                id = auth.uid ()
                AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all applications" ON applications FOR
UPDATE USING (
    EXISTS (
        SELECT 1
        FROM profiles
        WHERE
            id = auth.uid ()
            AND role = 'admin'
    )
);

-- Function to calculate match score (simplified algorithm)
CREATE OR REPLACE FUNCTION calculate_match_score(
    applicant_row applicants,
    provider_row space_providers
) RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    max_score INTEGER := 100;
BEGIN
    -- Industry alignment (30 points)
    IF applicant_row.industry = ANY(provider_row.industry_focus) THEN
        score := score + 30;
    END IF;
    
    -- Team size compatibility (20 points)
    IF applicant_row.team_size BETWEEN 1 AND 10 AND provider_row.team_size BETWEEN 10 AND 50 THEN
        score := score + 20;
    ELSIF applicant_row.team_size BETWEEN 10 AND 50 AND provider_row.team_size BETWEEN 50 AND 200 THEN
        score := score + 15;
    ELSIF ABS(applicant_row.team_size - provider_row.team_size) <= 5 THEN
        score := score + 10;
    END IF;
    
    -- Collaboration interests overlap (25 points)
    IF applicant_row.collaboration_interests && provider_row.offers THEN
        score := score + 25;
    END IF;
    
    -- Company stage bonus (15 points)
    IF applicant_row.company_stage IN ('growth', 'scale') THEN
        score := score + 15;
    ELSIF applicant_row.company_stage = 'mvp' THEN
        score := score + 10;
    END IF;
    
    -- Values alignment (10 points)
    IF applicant_row.looking_for IS NOT NULL AND provider_row.values IS NOT NULL THEN
        score := score + 10;
    END IF;
    
    RETURN LEAST(score, max_score);
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically calculate match score on application insert/update
CREATE OR REPLACE FUNCTION update_match_score()
RETURNS TRIGGER AS $$
DECLARE
    applicant_data applicants;
    provider_data space_providers;
BEGIN
    -- Get applicant data
    SELECT * INTO applicant_data FROM applicants WHERE id = NEW.applicant_id;
    
    -- Get provider data
    SELECT * INTO provider_data FROM space_providers WHERE id = NEW.provider_id;
    
    -- Calculate and update match score
    NEW.match_score := calculate_match_score(applicant_data, provider_data);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_application_match_score
    BEFORE INSERT OR UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_match_score();

-- Insert sample data
INSERT INTO
    profiles (id, email, role)
VALUES (
        '550e8400-e29b-41d4-a716-446655440000',
        'admin@workspacematching.com',
        'admin'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440001',
        'pixida@example.com',
        'space_provider'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440002',
        'startup@example.com',
        'applicant'
    );

INSERT INTO space_providers (profile_id, company_name, tagline, description, looking_for, offers, values, team_size, founded_year, industry_focus) VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', 'Pixida GmbH', 'Innovation through Technology', 'Leading technology consulting company specializing in digital transformation and innovation.', 
     ARRAY['Innovative startups', 'Tech companies', 'Digital agencies'], 
     ARRAY['Mentorship', 'Technical expertise', 'Network access', 'Funding connections'],
     ARRAY['Innovation', 'Collaboration', 'Excellence', 'Sustainability'],
     150, 2012, ARRAY['Technology', 'Automotive', 'IoT', 'AI/ML']);

INSERT INTO
    spaces (
        provider_id,
        name,
        type,
        size_sqm,
        capacity,
        available_from,
        monthly_price,
        description,
        location
    )
VALUES (
        (
            SELECT id
            FROM space_providers
            WHERE
                profile_id = '550e8400-e29b-41d4-a716-446655440001'
        ),
        'Innovation Lab Munich',
        'office',
        120,
        8,
        '2024-01-01',
        2500.00,
        'Modern office space perfect for innovative teams working on cutting-edge technology.',
        '{"address": "Maximilianstraße 35", "city": "Munich", "postal_code": "80539", "lat": 48.1392, "lng": 11.5802}'
    );

INSERT INTO
    applicants (
        id,
        company_name,
        company_stage,
        team_size,
        industry,
        description,
        looking_for,
        can_offer
    )
VALUES (
        '550e8400-e29b-41d4-a716-446655440002',
        'TechStart AI',
        'mvp',
        5,
        'Technology',
        'AI-powered startup building the future of automated customer service.',
        'Mentorship in scaling AI products, technical infrastructure support, and access to enterprise clients.',
        'Cutting-edge AI expertise, fresh perspectives on automation, and potential collaboration on AI projects.'
    );