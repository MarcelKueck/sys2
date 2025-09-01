#!/bin/bash

# Sample Data Creation Guide
# This script guides you through creating sample data via the UI

echo "🎭 Sample Data Creation Guide"
echo "============================"
echo ""
echo "Since the platform uses Supabase Auth, sample data must be created through user registration."
echo "Follow these steps to populate the platform with realistic test data:"
echo ""

echo "🏢 Step 1: Create Pixida GmbH Account"
echo "-------------------------------------"
echo "1. Visit: http://localhost:3000/auth/signup"
echo "2. Sign up with: info@pixida.com"
echo "3. Select role: 'space_provider'"
echo "4. Complete onboarding with Pixida details:"
echo "   • Company: Pixida GmbH"
echo "   • Founded: 2016"
echo "   • Team Size: 220"
echo "   • Industry: Automotive, Manufacturing, AI/ML"
echo "   • Description: Leading technology consulting company..."
echo ""

echo "🏭 Step 2: Create Workspace Listings"
echo "-----------------------------------"
echo "As Pixida user, create 3 workspaces:"
echo "1. Innovation Lab Munich Central (€3,200/month)"
echo "2. Automotive Tech Hub (€4,100/month)"  
echo "3. Manufacturing Innovation Center (€5,000/month)"
echo ""

echo "🚀 Step 3: Create Sample Applicant Companies"
echo "-------------------------------------------"
echo "Create these test applicant accounts:"
echo ""

echo "Company 1: MotionAI (High Match)"
echo "• Email: contact@motionai.de"
echo "• Industry: Automotive"
echo "• Stage: Growth"
echo "• Team Size: 18"
echo "• Focus: Autonomous driving AI"
echo ""

echo "Company 2: GreenFactory (High Match)"
echo "• Email: hello@greenfactory.eu"
echo "• Industry: Manufacturing"
echo "• Stage: Scale"
echo "• Team Size: 35"
echo "• Focus: Sustainable manufacturing IoT"
echo ""

echo "Company 3: DataMesh (Medium Match)"
echo "• Email: info@datamesh.io"
echo "• Industry: Technology"
echo "• Stage: Growth"
echo "• Team Size: 12"
echo "• Focus: IoT analytics platform"
echo ""

echo "Company 4: CloudKitchen (Low Match)"
echo "• Email: team@cloudkitchen.de"
echo "• Industry: Food Technology"
echo "• Stage: MVP"
echo "• Team Size: 8"
echo "• Focus: Virtual restaurant delivery"
echo ""

echo "Company 5: FinFlow (Low Match)"
echo "• Email: founders@finflow.com"
echo "• Industry: Fintech"
echo "• Stage: Growth"
echo "• Team Size: 22"
echo "• Focus: AI-powered financial planning"
echo ""

echo "📝 Step 4: Submit Applications"
echo "-----------------------------"
echo "1. Sign in as each applicant company"
echo "2. Browse available Pixida workspaces"
echo "3. Submit applications with detailed descriptions"
echo "4. Observe match scores being calculated automatically"
echo ""

echo "👨‍💼 Step 5: Test Admin Features"
echo "-------------------------------"
echo "1. Create admin account with admin@workspacematching.com"
echo "2. Use admin secret: ADMIN_SECRET_2024"
echo "3. Access admin panel: http://localhost:3000/admin"
echo "4. Review applications, test kanban workflow"
echo "5. Explore analytics dashboard"
echo ""

echo "🎯 Expected Results:"
echo "==================="
echo "• MotionAI: 85-95% match (automotive + AI focus)"
echo "• GreenFactory: 90-95% match (manufacturing + IoT)"
echo "• DataMesh: 70-80% match (IoT + tech focus)"
echo "• CloudKitchen: 30-40% match (different industry)"
echo "• FinFlow: 20-30% match (different industry)"
echo ""

echo "📊 Testing Checklist:"
echo "====================
 []   User registration and authentication
 []   Profile creation and editing
 []   Workspace listing creation
 []   Application submission
 []   Match score calculation
 []   Admin dashboard access
 []   Application review workflow
 []   Analytics and reporting
 []   Mobile responsiveness
 []   Error handling"
echo ""

echo "🚀 Ready to test! Start with: http://localhost:3000"
