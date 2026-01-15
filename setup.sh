#!/bin/bash

# BetterPlugins Hub - Quick Setup Script
# This script helps you set up the project locally

echo "🚀 BetterPlugins Hub - Setup Script"
echo "===================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found!"
    echo "📋 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo ""
    echo "📝 Please edit .env.local with your Firebase credentials:"
    echo "   - NEXT_PUBLIC_FIREBASE_API_KEY"
    echo "   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    echo "   - NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    echo "   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    echo "   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    echo "   - NEXT_PUBLIC_FIREBASE_APP_ID"
    echo "   - NEXT_PUBLIC_ADMIN_EMAILS (your admin email)"
    echo ""
else
    echo "✅ .env.local exists"
fi

# Run type check
echo "🔍 Running TypeScript type check..."
npm run typecheck
if [ $? -ne 0 ]; then
    echo "⚠️  TypeScript check failed. Fix errors before running."
    exit 1
fi
echo "✅ TypeScript check passed"
echo ""

# Success message
echo "✨ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Configure Firebase in .env.local (if not already done)"
echo "2. Set up Firebase project:"
echo "   - Enable Firestore Database"
echo "   - Enable Cloud Storage"
echo "   - Enable Google Authentication"
echo "3. Run: npm run dev"
echo "4. Open: http://localhost:9002"
echo ""
echo "📖 For detailed setup, see: README.md"
echo "🚀 For deployment, see: DEPLOYMENT.md"
echo ""
