-- Script to create admin user
-- Run this in your Supabase SQL editor or psql

-- First, you need the user ID from Supabase Auth
-- Go to Supabase Studio > Authentication > Users and create a user
-- Then copy the user ID and replace 'YOUR_USER_ID_HERE' below

-- Update the profile to admin role
UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID_HERE';

-- Or if you want to insert a new profile (make sure the ID matches the auth user)
-- INSERT INTO profiles (id, email, role)
-- VALUES ('YOUR_USER_ID_HERE', 'admin@workspacematching.com', 'admin');