-- Simpler seed data approach that works with Supabase Auth
-- This creates the Pixida profile and spaces without auth dependencies

-- Insert Pixida GmbH Space Provider (will be created when user signs up)
-- For now, let's create spaces and sample applicant data that can be used once users register

-- Create sample space provider entry for demonstration
-- (This will be replaced when actual Pixida user signs up)
DO $$
DECLARE
    pixida_profile_id UUID := '550e8400-e29b-41d4-a716-446655440001';
    pixida_provider_id UUID := '650e8400-e29b-41d4-a716-446655440001';
BEGIN
    -- Only insert if not exists to avoid duplicates
    IF NOT EXISTS (SELECT 1 FROM space_providers WHERE id = pixida_provider_id) THEN
        
        -- Insert a demo profile (this will be replaced by real auth signup)
        INSERT INTO profiles (id, email, role) VALUES 
            (pixida_profile_id, 'demo@pixida.com', 'space_provider')
        ON CONFLICT (id) DO NOTHING;

        -- Insert Pixida GmbH Space Provider
        INSERT INTO space_providers (
            id, profile_id, company_name, tagline, description, 
            looking_for, offers, values, team_size, founded_year, industry_focus
        ) VALUES (
            pixida_provider_id,
            pixida_profile_id,
            'Pixida GmbH',
            'Innovation through Technology & Digital Transformation',
            'Pixida is a leading technology consulting company founded in 2016 with over 200 employees. We specialize in automotive solutions, manufacturing digitalization, and cutting-edge AI/ML applications. Our mission is to drive digital transformation across industries while fostering innovation partnerships.',
            ARRAY['AI/ML startups', 'IoT companies', 'Digital transformation partners', 'Automotive tech companies', 'Manufacturing technology firms', 'Data analytics startups'],
            ARRAY['Technical mentorship', 'Industry expertise', 'Network access', 'Funding connections', 'Automotive industry insights', 'Manufacturing knowledge', 'AI/ML expertise'],
            ARRAY['Innovation', 'Collaboration', 'Excellence', 'Sustainability', 'Digital Transformation', 'Technology Leadership'],
            220,
            2016,
            ARRAY['Automotive', 'Manufacturing', 'Digital Innovation', 'AI/ML', 'IoT', 'Data Analytics']
        );

        -- Insert 3 Pixida Spaces with realistic Munich addresses
        INSERT INTO spaces (
            id, provider_id, name, type, size_sqm, capacity, available_from,
            monthly_price, amenities, images, description, location
        ) VALUES 
        (
            '750e8400-e29b-41d4-a716-446655440001',
            pixida_provider_id,
            'Innovation Lab Munich Central',
            'office',
            150,
            20,
            '2024-12-01',
            3200.00,
            '{"wifi": true, "kitchen": true, "parking": true, "printer": true, "meeting_rooms": 3, "event_space": true, "gym": true, "ai_computing": true}',
            ARRAY['/spaces/pixida-lab-1.jpg', '/spaces/pixida-lab-2.jpg'],
            'Premium innovation workspace in Munich''s city center. Features state-of-the-art AI computing infrastructure, rapid prototyping lab, and collaborative spaces designed for breakthrough technology development.',
            '{"address": "Maximilianstraße 35", "city": "Munich", "postal_code": "80539", "country": "Germany", "lat": 48.1392, "lng": 11.5802}'
        ),
        (
            '750e8400-e29b-41d4-a716-446655440002',
            pixida_provider_id,
            'Automotive Tech Hub',
            'office',
            200,
            25,
            '2025-01-15',
            4100.00,
            '{"wifi": true, "kitchen": true, "parking": true, "printer": true, "meeting_rooms": 4, "automotive_lab": true, "testing_facility": true, "workshop": true}',
            ARRAY['/spaces/pixida-auto-1.jpg', '/spaces/pixida-auto-2.jpg'],
            'Specialized workspace for automotive technology companies. Includes vehicle testing facilities, automotive-grade development tools, and direct access to Pixida''s automotive expertise and network.',
            '{"address": "Arnulfstraße 126", "city": "Munich", "postal_code": "80636", "country": "Germany", "lat": 48.1351, "lng": 11.5418}'
        ),
        (
            '750e8400-e29b-41d4-a716-446655440003',
            pixida_provider_id,
            'Manufacturing Innovation Center',
            'workshop',
            300,
            30,
            '2025-02-01',
            5000.00,
            '{"wifi": true, "kitchen": true, "parking": true, "printer": true, "meeting_rooms": 2, "manufacturing_lab": true, "3d_printing": true, "iot_testbed": true, "clean_room": true}',
            ARRAY['/spaces/pixida-manu-1.jpg', '/spaces/pixida-manu-2.jpg'],
            'Advanced manufacturing workspace with Industry 4.0 capabilities. Features IoT testbed, 3D printing facilities, clean room environment, and smart manufacturing demonstration areas.',
            '{"address": "Schleißheimer Straße 90", "city": "Munich", "postal_code": "80797", "country": "Germany", "lat": 48.1698, "lng": 11.5664}'
        );
        
        RAISE NOTICE 'Successfully created Pixida profile and 3 workspaces';
    ELSE
        RAISE NOTICE 'Pixida profile already exists, skipping...';
    END IF;
END $$;