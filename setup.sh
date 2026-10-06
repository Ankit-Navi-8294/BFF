#!/bin/bash

echo "🍛 BFF - Best Food Forever Setup"
echo "=================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker not installed. Please install Docker Desktop."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not installed. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker and Docker Compose found"
echo ""

# Create .env file if not exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# Database
DB_USERNAME=bff_user
DB_PASSWORD=bff_password
DB_HOST=mysql
DB_PORT=3306
DB_NAME=bff_db

# JWT
JWT_SECRET=$(openssl rand -base64 32)

# Google OAuth2 (update with your credentials)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# OpenAI (update with your API key)
OPENAI_API_KEY=sk-your-api-key

# Server
SERVER_PORT=8080
FRONTEND_URL=http://localhost:5173
EOF
    echo "✅ .env file created. Please update with your credentials."
    echo ""
fi

# Build and start services
echo "Building and starting services..."
docker-compose build

echo ""
echo "🚀 Starting BFF services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "✅ BFF is starting up!"
echo ""
echo "📍 Access points:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:8080"
echo "   MySQL:    localhost:3306"
echo ""
echo "📝 Logs:"
echo "   docker-compose logs -f backend   # Backend logs"
echo "   docker-compose logs -f frontend  # Frontend logs"
echo "   docker-compose logs -f mysql     # MySQL logs"
echo ""
echo "🛑 To stop services:"
echo "   docker-compose down"
echo ""
echo "For more information, see README.md"
