#!/bin/bash

echo "🚀 Setting up Chatbot Server..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create environment files if they don't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your actual configuration values"
else
    echo "✅ .env file already exists"
fi

if [ ! -f .docker/.env ]; then
    echo "📝 Creating .docker/.env file from template..."
    cp docker.env.example .docker/.env
    echo "⚠️  Please edit .docker/.env file with your actual configuration values"
else
    echo "✅ .docker/.env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build Docker containers
echo "🐳 Building Docker containers..."
./scripts/rebuild.sh

# Start containers
echo "🚀 Starting containers..."
./scripts/start.sh

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and .docker/.env files with your configuration"
echo "2. Inside the container, run: pnpm db:create"
echo "3. Then run: pnpm db:migrate"
echo "4. Finally run: pnpm dev"
echo ""
echo "The server will be available at http://localhost:7001"
