# BFF — Best Food Forever ❤️

**Good Food. Great Memories. Forever BFF.**

A production-quality full-stack Indian food discovery and ordering platform built with modern web technologies, featuring AI-powered recommendations, real-time order tracking, and a delightful user experience.

---

## 🎯 Project Overview

BFF is designed to be more than just a food delivery platform. It's a digital place where:
- Indian food brings back memories
- Cuisine tells a story
- Every dish has cultural significance
- Users discover their next favorite meal through AI-assisted recommendations

### Key Features

✨ **Food Discovery**
- Browse 50+ authentic Indian dishes across 6 regions
- Search and filter by cuisine, category, spice level, price, and dietary preferences
- Detailed food stories and cultural context
- User ratings and reviews

🤖 **AI-Powered Recommendations**
- "Ask BFF" - Conversational AI food assistant
- Personalized recommendations based on:
  - Previous orders
  - Favorite foods
  - Search history
  - Cuisine and spice preferences
  - Budget constraints

🛒 **Shopping & Orders**
- Real-time cart management
- Multiple delivery addresses
- Order tracking with visual timeline
- Order history

❤️ **Personalization**
- Save favorite dishes
- Write and read reviews
- User profiles
- Saved delivery addresses

🔐 **Authentication**
- Email/password registration and login
- Google OAuth2 integration
- JWT-based authentication
- Role-based authorization (User, Admin)

🎨 **Premium UI/UX**
- Modern, warm design inspired by Indian aesthetics
- Smooth Framer Motion animations
- Fully responsive (mobile, tablet, desktop)
- Respects reduced motion preferences
- Dark mode ready with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Java 21** - Language
- **Spring Boot 3.3** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - ORM
- **JWT** - Token-based authentication
- **OAuth2** - Social login
- **Spring AI** - AI integrations
- **Maven** - Build tool

### Database
- **MySQL 8.0** - Relational database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Orchestration
- **Git** - Version control

---

## 📋 Prerequisites

- Node.js 18+ and npm
- Java 21 JDK
- MySQL 8.0
- Docker & Docker Compose (optional, for containerized setup)
- Git

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone and navigate to project:**
   ```bash
   cd BFF
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start all services:**
   ```bash
   docker-compose up -d
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8080
   - MySQL: localhost:3306

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Configure database:**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE bff_db;
   EXIT;
   ```

4. **Build and run:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   Backend runs on `http://localhost:8080`

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Frontend runs on `http://localhost:5173`

---

## 📁 Project Structure

```
BFF/
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/java/com/bff/
│   │   │   ├── controller/    # REST API endpoints
│   │   │   ├── service/       # Business logic
│   │   │   ├── repository/    # Data access layer
│   │   │   ├── entity/        # JPA entities
│   │   │   ├── dto/           # Data transfer objects
│   │   │   ├── security/      # JWT & OAuth2
│   │   │   ├── config/        # Spring configuration
│   │   │   ├── exception/     # Exception handling
│   │   │   ├── ai/            # Spring AI integration
│   │   │   └── util/          # Utilities
│   │   └── resources/
│   │       └── application.yml # Configuration
│   └── pom.xml
├── frontend/                   # React + Vite Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── store/             # Redux store
│   │   ├── api/               # API client
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utilities
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docker/
│   └── init.sql               # Database initialization
├── docker-compose.yml         # Docker orchestration
└── README.md                  # This file
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Food
- `GET /api/foods` - Get all foods (paginated)
- `GET /api/foods/{id}` - Get food by ID
- `GET /api/foods/top/rated` - Get top-rated foods
- `GET /api/foods/search` - Search and filter foods
- `GET /api/foods/category/{categoryId}` - Foods by category
- `GET /api/foods/region/{regionId}` - Foods by region
- `GET /api/foods/cuisine/{cuisineId}` - Foods by cuisine
- `GET /api/foods/vegetarian` - Vegetarian foods

### Categories, Regions, Cuisines
- `GET /api/categories` - All categories
- `GET /api/regions` - All regions
- `GET /api/cuisines` - All cuisines

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add to cart
- `PUT /api/cart/items/{itemId}` - Update item quantity
- `DELETE /api/cart/items/{itemId}` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{orderId}` - Get order details
- `PUT /api/orders/{orderId}/status` - Update order status (Admin)

### Favorites
- `POST /api/favorites/{foodId}` - Add to favorites
- `DELETE /api/favorites/{foodId}` - Remove from favorites
- `GET /api/favorites` - Get user's favorites
- `GET /api/favorites/{foodId}/is-favorited` - Check if favorited

### Reviews
- `POST /api/reviews/foods/{foodId}` - Create review
- `GET /api/reviews/foods/{foodId}` - Get food reviews
- `GET /api/reviews/my-reviews` - Get user's reviews

### AI
- `POST /api/ai/chat` - Chat with BFF AI
- `POST /api/ai/recommend` - Get personalized recommendations

---

## 🔑 Environment Variables

### Backend (.env)

```env
# Database
DB_USERNAME=bff_user
DB_PASSWORD=bff_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bff_db

# JWT
JWT_SECRET=your-256-bit-secret-key-here

# Google OAuth2
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# OpenAI (for Spring AI)
OPENAI_API_KEY=sk-your-api-key

# Server
SERVER_PORT=8080
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 📊 Database Schema

The application uses 14 main tables:

1. **users** - User accounts and profiles
2. **roles** - User roles (USER, ADMIN)
3. **user_roles** - Role assignments
4. **foods** - Food items/dishes
5. **categories** - Food categories
6. **regions** - Indian regions
7. **cuisines** - Food cuisines
8. **carts** - User shopping carts
9. **cart_items** - Items in carts
10. **orders** - Order records
11. **order_items** - Items in orders
12. **addresses** - Delivery addresses
13. **reviews** - Food reviews
14. **favorites** - Favorite foods
15. **refresh_tokens** - JWT refresh tokens

---

## 🔒 Security Features

- ✅ BCrypt password hashing
- ✅ JWT access tokens (24-hour expiration)
- ✅ Refresh tokens (7-day expiration)
- ✅ OAuth2 social login (Google)
- ✅ CORS configuration
- ✅ Role-based authorization (RBAC)
- ✅ Environment variables for secrets
- ✅ SQL injection prevention via JPA
- ✅ Input validation
- ✅ Error handling without exposing internals

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 📝 Sample Food Data

The database includes 50+ authentic Indian dishes including:

**North India:** Butter Chicken, Chole Bhature, Amritsari Kulcha
**South India:** Masala Dosa, Idli, Sambar, Rasam
**East India:** Rosogolla, Mishti Doi, Macher Jhol
**West India:** Dhokla, Vada Pav, Pav Bhaji
**Northeast India:** Momos, Thukpa, Smoked Pork
**Central India:** Dal Baati Churma, Gatte Ki Sabzi

Each dish includes:
- Authentic regional story
- Nutritional information
- Spice level (1-5)
- Vegetarian/Non-vegetarian classification
- Preparation time
- Price

---

## 🎨 Design System

### Colors
- **Primary (Saffron):** #E85D04
- **Secondary (Terracotta):** #C44536
- **Accent (Turmeric):** #F4B400
- **Supporting (Leaf Green):** #588157
- **Background (Cream):** #FFF8ED
- **Dark (Deep Brown):** #2B2118
- **Text (Charcoal):** #292524

### Typography
- **Primary Font:** Poppins / Inter
- **Devanagari:** Noto Sans Devanagari

### Animation Timing
- Micro-interactions: 200-300ms
- Page transitions: 300-500ms
- Scroll animations: 600-800ms

---

## 🚢 Deployment

### Docker Deployment

1. **Build images:**
   ```bash
   docker-compose build
   ```

2. **Deploy:**
   ```bash
   docker-compose up -d
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

### Traditional Deployment

**Backend:**
```bash
mvn clean package
java -jar target/bff-backend-1.0.0.jar
```

**Frontend:**
```bash
npm run build
# Serve dist/ folder via Nginx or similar
```

---

## 📖 API Documentation

Comprehensive API documentation with request/response examples is available at:
- Backend: `http://localhost:8080/swagger-ui.html` (when implemented)
- Or see the Controller classes in `backend/src/main/java/com/bff/controller/`

---

## 🐛 Troubleshooting

### Backend won't start
- Check Java 21 is installed: `java -version`
- Verify MySQL is running
- Check environment variables in `.env`

### Frontend won't connect to backend
- Ensure backend is running on port 8080
- Check `VITE_API_URL` in frontend `.env.local`
- Verify CORS is enabled in backend

### Database errors
- Ensure MySQL user `bff_user` exists with correct password
- Database schema initialized from `docker/init.sql`
- Check database connection in backend logs

---

## 🤝 Contributing

This is a portfolio project. For contributions or improvements:

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Author

Built as a production-quality full-stack portfolio project demonstrating:
- Enterprise Spring Boot architecture
- Modern React development practices
- Cloud-native containerization
- Real-world system design

---

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Real-time order notifications (WebSocket)
- [ ] Admin analytics dashboard
- [ ] User analytics and heatmaps
- [ ] Food image recognition with AI
- [ ] Subscription meal plans
- [ ] Restaurant management dashboard
- [ ] Social sharing and referrals
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Progressive Web App (PWA)
- [ ] Mobile apps (iOS/Android with React Native)

---

## 📞 Support

For issues or questions:
- Check existing GitHub issues
- Review API documentation
- Check backend logs: `docker-compose logs backend`
- Check frontend console: Browser DevTools

---

**Made with ❤️ for Indian food lovers worldwide.**

*"Some flavors feel like home."*
