#!/bin/bash

# Seed Database Script for Workspace Matching Platform MVP
# This script creates comprehensive sample data including Pixida's profile and 10 sample applications

echo "🌱 Starting database seeding process..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if database is running
if ! docker-compose ps | grep -q "Up"; then
    echo "🚀 Starting database..."
    yarn db:start
    sleep 5
fi

# Check if we have psql available
if ! command -v psql &> /dev/null; then
    echo "📦 Installing PostgreSQL client..."
    # For Ubuntu/Debian
    if command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y postgresql-client
    # For macOS with Homebrew
    elif command -v brew &> /dev/null; then
        brew install postgresql
    else
        echo "❌ Please install PostgreSQL client to continue"
        exit 1
    fi
fi

# Run the seeding script
echo "🌱 Seeding database with Pixida profile and sample applications..."

# Execute the SQL script
PGPASSWORD=postgres psql -h localhost -p 54322 -U postgres -d postgres -f scripts/seed-data.sql

if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully!"
    echo ""
    echo "📊 Sample Data Created:"
    echo "   • Admin account: admin@workspacematching.com"
    echo "   • Pixida GmbH profile with 3 Munich spaces"
    echo "   • 10 diverse sample applications with varying match scores"
    echo ""
    echo "🚀 Ready to test the MVP!"
    echo "   • Start the app: yarn dev"
    echo "   • Access: http://localhost:3000"
    echo "   • Admin panel: http://localhost:3000/admin"
else
    echo "❌ Failed to seed database. Check the logs above for errors."
    exit 1
fi
