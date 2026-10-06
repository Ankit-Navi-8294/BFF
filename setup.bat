@echo off
REM BFF - Best Food Forever Setup Script for Windows

echo.
echo 🍛 BFF - Best Food Forever Setup
echo ==================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker not found. Please install Docker Desktop.
    pause
    exit /b 1
)

echo ✅ Docker found

REM Create .env file if not exists
if not exist .env (
    echo Creating .env file...
    (
        echo # Database
        echo DB_USERNAME=bff_user
        echo DB_PASSWORD=bff_password
        echo DB_HOST=mysql
        echo DB_PORT=3306
        echo DB_NAME=bff_db
        echo.
        echo # JWT
        echo JWT_SECRET=your-256-bit-secret-key-change-in-production
        echo.
        echo # Google OAuth2
        echo GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
        echo GOOGLE_CLIENT_SECRET=your-client-secret
        echo.
        echo # OpenAI
        echo OPENAI_API_KEY=sk-your-api-key
        echo.
        echo # Server
        echo SERVER_PORT=8080
        echo FRONTEND_URL=http://localhost:5173
    ) > .env
    echo ✅ .env file created. Please update with your credentials.
    echo.
)

REM Build and start services
echo Building and starting services...
docker-compose build
echo.

echo 🚀 Starting BFF services...
docker-compose up -d

echo.
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak

echo.
echo 📊 Service Status:
docker-compose ps

echo.
echo ✅ BFF is starting up!
echo.
echo 📍 Access points:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:8080
echo    MySQL:    localhost:3306
echo.
echo 📝 Logs:
echo    docker-compose logs -f backend   # Backend logs
echo    docker-compose logs -f frontend  # Frontend logs
echo    docker-compose logs -f mysql     # MySQL logs
echo.
echo 🛑 To stop services:
echo    docker-compose down
echo.
echo For more information, see README.md
echo.
pause
