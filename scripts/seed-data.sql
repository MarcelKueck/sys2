-- Comprehensive Seed Data for Workspace Matching Platform MVP
-- This script creates Pixida's profile with 3 spaces and 10 diverse sample applications

-- Clean up existing data (for development/testing only)
TRUNCATE applications,
spaces,
applicants,
space_providers,
profiles CASCADE;

-- Insert Pixida GmbH Profile and Admin User
INSERT INTO
    profiles (id, email, role)
VALUES (
        '550e8400-e29b-41d4-a716-446655440000',
        'admin@workspacematching.com',
        'admin'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440001',
        'info@pixida.com',
        'space_provider'
    );

-- Insert Pixida GmbH Space Provider
INSERT INTO space_providers (
    id, profile_id, company_name, tagline, description, 
    looking_for, offers, values, team_size, founded_year, industry_focus
) VALUES (
    '650e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
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
    '650e8400-e29b-41d4-a716-446655440001',
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
    '650e8400-e29b-41d4-a716-446655440001',
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
    '650e8400-e29b-41d4-a716-446655440001',
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

-- Insert 10 Diverse Sample Applicants with Varying Match Scores
INSERT INTO
    profiles (id, email, role)
VALUES (
        '550e8400-e29b-41d4-a716-446655440010',
        'contact@motionai.de',
        'applicant'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440011',
        'hello@greenfactory.eu',
        'applicant'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440012',
        'info@datamesh.io',
        'applicant'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440013',
        'team@cloudkitchen.de',
        'applicant'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440014',
        'founders@finflow.com',
        'applicant'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440015',
        'contact@quantumleap.tech',
        'applicant'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440016',
        'hello@healthtech.ai',
        'applicant'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440017',
        'info@urbanmobility.de',
        'applicant'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440018',
        'team@energyflow.eu',
        'applicant'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440019',
        'founders@roboticslab.com',
        'applicant'
    );

-- Sample Applicant 1: MotionAI (High Match - 95+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440010',
    'MotionAI',
    'growth',
    18,
    'Automotive',
    'MotionAI develops cutting-edge autonomous driving software using advanced machine learning and computer vision. Our solutions power the next generation of self-driving vehicles with focus on safety, efficiency, and real-world deployment.',
    'Automotive industry expertise, Hardware integration partners, Testing facilities, Regulatory guidance',
    'AI/ML expertise, Autonomous driving algorithms, Computer vision solutions, Safety validation systems',
    'https://motionai.de',
    'https://linkedin.com/company/motionai',
    '2022-03-15',
    'Series A - €8M raised',
    ARRAY['Python', 'TensorFlow', 'ROS', 'C++', 'CUDA', 'OpenCV', 'PyTorch'],
    'Automotive OEMs, Hardware suppliers, Testing organizations',
    ARRAY['Automotive technology', 'AI/ML', 'Hardware integration', 'Safety standards']
);

-- Sample Applicant 2: GreenFactory (High Match - 90+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440011',
    'GreenFactory',
    'scale',
    35,
    'Manufacturing',
    'GreenFactory revolutionizes manufacturing with sustainable, IoT-enabled smart factory solutions. We help traditional manufacturers transition to Industry 4.0 while reducing environmental impact by 40%.',
    'Manufacturing expertise, IoT integration, Sustainability partners, Industrial automation specialists',
    'Smart manufacturing solutions, Sustainability consulting, IoT implementation, Process optimization',
    'https://greenfactory.eu',
    'https://linkedin.com/company/greenfactory',
    '2020-08-10',
    'Series B - €15M raised',
    ARRAY['Node.js', 'IoT', 'React', 'PostgreSQL', 'Docker', 'MQTT', 'InfluxDB'],
    'Manufacturing companies, Sustainability consultants, IoT specialists',
    ARRAY['Manufacturing', 'IoT', 'Sustainability', 'Digital transformation']
);

-- Sample Applicant 3: DataMesh (Medium Match - 75+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440012',
    'DataMesh',
    'growth',
    12,
    'Technology',
    'DataMesh provides real-time IoT analytics platform for industrial applications. Our edge computing solutions process massive data streams with millisecond latency for critical industrial decisions.',
    'Industrial IoT expertise, Edge computing partners, Manufacturing clients, Technical mentorship',
    'Real-time analytics, Edge computing solutions, IoT data processing, Industrial insights',
    'https://datamesh.io',
    'https://linkedin.com/company/datamesh',
    '2021-11-20',
    'Seed - €3M raised',
    ARRAY['Golang', 'Apache Kafka', 'Kubernetes', 'TimescaleDB', 'gRPC', 'Prometheus'],
    'IoT companies, Industrial automation firms, Data scientists',
    ARRAY['IoT', 'Data analytics', 'Edge computing', 'Industrial applications']
);

-- Sample Applicant 4: CloudKitchen (Low Match - 35+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440013',
    'CloudKitchen',
    'mvp',
    8,
    'Food Technology',
    'CloudKitchen operates virtual restaurants optimized for delivery platforms. We use data analytics to optimize menu offerings, delivery routes, and kitchen operations for maximum efficiency.',
    'Food industry expertise, Delivery platform partnerships, Operations optimization, Local market knowledge',
    'Food tech solutions, Delivery optimization, Kitchen automation, Market analytics',
    'https://cloudkitchen.de',
    'https://linkedin.com/company/cloudkitchen-de',
    '2023-05-12',
    'Pre-seed - €800K raised',
    ARRAY['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Redis'],
    'Food delivery companies, Restaurant tech, Logistics companies',
    ARRAY['Food technology', 'Logistics', 'Data analytics', 'Operations']
);

-- Sample Applicant 5: FinFlow (Low Match - 25+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440014',
    'FinFlow',
    'growth',
    22,
    'Fintech',
    'FinFlow provides AI-powered financial planning and investment management for SMEs. Our platform democratizes access to sophisticated financial tools traditionally only available to large enterprises.',
    'Financial expertise, Regulatory guidance, Banking partnerships, Investment networks',
    'Financial technology, AI algorithms, Risk assessment, Compliance solutions',
    'https://finflow.com',
    'https://linkedin.com/company/finflow',
    '2021-09-05',
    'Series A - €12M raised',
    ARRAY['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'React'],
    'Fintech companies, Financial advisors, Regulatory experts',
    ARRAY['Financial technology', 'AI/ML', 'Risk management', 'Compliance']
);

-- Sample Applicant 6: QuantumLeap (Medium Match - 70+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440015',
    'QuantumLeap Technologies',
    'mvp',
    6,
    'Deep Tech',
    'QuantumLeap develops quantum computing solutions for optimization problems in manufacturing and logistics. Our hybrid quantum-classical algorithms solve previously intractable industrial challenges.',
    'Quantum computing expertise, Manufacturing applications, Research partnerships, Technical validation',
    'Quantum algorithms, Optimization solutions, Research collaboration, Technical innovation',
    'https://quantumleap.tech',
    'https://linkedin.com/company/quantumleap-tech',
    '2023-01-10',
    'Pre-seed - €2M raised',
    ARRAY['Qiskit', 'Python', 'Julia', 'CUDA', 'NumPy', 'SciPy'],
    'Research institutions, Quantum computing companies, Manufacturing firms',
    ARRAY['Quantum computing', 'Manufacturing', 'Optimization', 'Research']
);

-- Sample Applicant 7: HealthTech.AI (Medium Match - 65+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440016',
    'HealthTech.AI',
    'growth',
    15,
    'Healthcare Technology',
    'HealthTech.AI develops AI-powered diagnostic tools for medical imaging. Our deep learning models assist radiologists in early detection of diseases with 95%+ accuracy across multiple imaging modalities.',
    'Healthcare expertise, Medical device regulation, Clinical partnerships, AI research collaboration',
    'Medical AI solutions, Diagnostic algorithms, Healthcare innovation, Clinical validation',
    'https://healthtech.ai',
    'https://linkedin.com/company/healthtech-ai',
    '2022-06-18',
    'Series A - €10M raised',
    ARRAY['Python', 'TensorFlow', 'PyTorch', 'DICOM', 'OpenCV', 'FastAPI'],
    'Healthcare companies, AI researchers, Medical device manufacturers',
    ARRAY['AI/ML', 'Healthcare', 'Medical devices', 'Research']
);

-- Sample Applicant 8: UrbanMobility (High Match - 85+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440017',
    'UrbanMobility Solutions',
    'growth',
    20,
    'Automotive',
    'UrbanMobility develops smart traffic management systems and connected vehicle infrastructure. Our IoT-based solutions reduce urban congestion by 30% while improving safety and air quality.',
    'Automotive industry connections, Smart city partnerships, IoT expertise, Government relations',
    'Traffic optimization, Connected vehicle technology, IoT solutions, Smart city expertise',
    'https://urbanmobility.de',
    'https://linkedin.com/company/urbanmobility',
    '2021-04-22',
    'Series A - €6M raised',
    ARRAY['Java', 'Apache Kafka', 'Elasticsearch', 'React', 'PostgreSQL', 'MQTT'],
    'Automotive companies, Smart city developers, Government agencies',
    ARRAY['Automotive', 'IoT', 'Smart cities', 'Transportation']
);

-- Sample Applicant 9: EnergyFlow (Medium Match - 60+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440018',
    'EnergyFlow Dynamics',
    'scale',
    28,
    'Energy Technology',
    'EnergyFlow creates AI-powered energy management systems for industrial facilities. Our platform optimizes energy consumption, integrates renewable sources, and reduces costs by up to 25%.',
    'Energy industry expertise, Industrial partnerships, Renewable energy connections, Regulatory guidance',
    'Energy optimization, AI algorithms, Renewable integration, Industrial automation',
    'https://energyflow.eu',
    'https://linkedin.com/company/energyflow',
    '2020-10-14',
    'Series B - €18M raised',
    ARRAY['Python', 'Apache Spark', 'InfluxDB', 'Grafana', 'Docker', 'Kubernetes'],
    'Energy companies, Industrial manufacturers, Renewable energy firms',
    ARRAY['Energy management', 'AI/ML', 'Industrial automation', 'Sustainability']
);

-- Sample Applicant 10: RoboticsLab (High Match - 80+ score)
INSERT INTO applicants (
    id, company_name, company_stage, team_size, industry, description,
    looking_for, can_offer, website, linkedin, founded_date, funding_status,
    tech_stack, ideal_neighbors, collaboration_interests
) VALUES (
    '550e8400-e29b-41d4-a716-446655440019',
    'RoboticsLab',
    'growth',
    16,
    'Manufacturing',
    'RoboticsLab develops collaborative robots (cobots) for manufacturing automation. Our AI-powered robots work safely alongside humans, increasing productivity while maintaining flexibility.',
    'Manufacturing expertise, Robotics integration, Safety standards, Industrial partnerships',
    'Collaborative robotics, Manufacturing automation, AI integration, Safety systems',
    'https://roboticslab.com',
    'https://linkedin.com/company/roboticslab',
    '2022-01-30',
    'Series A - €7M raised',
    ARRAY['ROS', 'Python', 'C++', 'OpenCV', 'TensorFlow', 'Gazebo'],
    'Manufacturing companies, Robotics firms, Automation specialists',
    ARRAY['Manufacturing', 'Robotics', 'AI/ML', 'Automation']
);

-- Create Applications from these companies to Pixida
INSERT INTO applications (
    id, applicant_id, provider_id, interested_spaces, status, submitted_at, notes
) VALUES 
(
    '850e8400-e29b-41d4-a716-446655440010',
    '550e8400-e29b-41d4-a716-446655440010',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440002'],
    'pending',
    NOW() - INTERVAL '2 days',
    'Excellent fit for automotive innovation. Strong AI/ML capabilities.'
),
(
    '850e8400-e29b-41d4-a716-446655440011',
    '550e8400-e29b-41d4-a716-446655440011',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440003'],
    'reviewed',
    NOW() - INTERVAL '5 days',
    'Perfect alignment with manufacturing digitalization goals.'
),
(
    '850e8400-e29b-41d4-a716-446655440012',
    '550e8400-e29b-41d4-a716-446655440012',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440001'],
    'pending',
    NOW() - INTERVAL '1 day',
    'Good IoT and analytics capabilities for industrial applications.'
),
(
    '850e8400-e29b-41d4-a716-446655440013',
    '550e8400-e29b-41d4-a716-446655440013',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440001'],
    'pending',
    NOW() - INTERVAL '3 days',
    'Limited alignment with core focus areas but innovative approach.'
),
(
    '850e8400-e29b-41d4-a716-446655440014',
    '550e8400-e29b-41d4-a716-446655440014',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440001'],
    'pending',
    NOW() - INTERVAL '4 days',
    'Outside core focus areas but strong technical team.'
),
(
    '850e8400-e29b-41d4-a716-446655440015',
    '550e8400-e29b-41d4-a716-446655440015',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440003'],
    'shortlisted',
    NOW() - INTERVAL '7 days',
    'Innovative quantum computing applications for manufacturing optimization.'
),
(
    '850e8400-e29b-41d4-a716-446655440016',
    '550e8400-e29b-41d4-a716-446655440016',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440001'],
    'reviewed',
    NOW() - INTERVAL '6 days',
    'Strong AI capabilities, potential for cross-industry applications.'
),
(
    '850e8400-e29b-41d4-a716-446655440017',
    '550e8400-e29b-41d4-a716-446655440017',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440002'],
    'shortlisted',
    NOW() - INTERVAL '8 days',
    'Excellent fit for automotive and smart city initiatives.'
),
(
    '850e8400-e29b-41d4-a716-446655440018',
    '550e8400-e29b-41d4-a716-446655440018',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440003'],
    'reviewed',
    NOW() - INTERVAL '9 days',
    'Strong potential for industrial energy optimization collaboration.'
),
(
    '850e8400-e29b-41d4-a716-446655440019',
    '550e8400-e29b-41d4-a716-446655440019',
    '650e8400-e29b-41d4-a716-446655440001',
    ARRAY['750e8400-e29b-41d4-a716-446655440003'],
    'shortlisted',
    NOW() - INTERVAL '10 days',
    'Perfect fit for manufacturing automation and robotics collaboration.'
);

-- Update match scores (will be calculated automatically by trigger, but setting some sample values)
-- The trigger function will recalculate these based on the algorithm

COMMIT;