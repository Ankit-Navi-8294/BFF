# BFF Development Guide

## Quick Commands

### Backend
```bash
cd backend

# Build
mvn clean install

# Run (development)
mvn spring-boot:run

# Run tests
mvn test

# Package for production
mvn clean package -DskipTests

# View dependencies
mvn dependency:tree
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Docker
```bash
# Build all images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

## Development Workflow

### 1. Backend Development

**Create a new REST endpoint:**

1. Add entity if needed in `backend/src/main/java/com/bff/entity/`
2. Add repository in `backend/src/main/java/com/bff/repository/`
3. Add DTO in `backend/src/main/java/com/bff/dto/`
4. Add service in `backend/src/main/java/com/bff/service/`
5. Add controller in `backend/src/main/java/com/bff/controller/`

**Apply custom exception handling:**
- Extend the GlobalExceptionHandler for new exception types
- Use proper HTTP status codes

**Testing:**
- Unit tests in `backend/src/test/java/com/bff/`
- Use MockMvc for controller tests
- Use @DataJpaTest for repository tests

### 2. Frontend Development

**Create a new page:**

1. Create page component in `frontend/src/pages/`
2. Add route in `App.jsx`
3. Create API calls in `frontend/src/api/` if needed
4. Add Redux slices if state management needed
5. Style with Tailwind CSS

**Using Redux:**
```javascript
import { useDispatch, useSelector } from 'react-redux'
import { setFoods } from '../store/slices/foodSlice'

function Component() {
  const dispatch = useDispatch()
  const foods = useSelector(state => state.food.foods)
  
  // Use dispatch and foods
}
```

**API calls:**
```javascript
import api from '../api/client'

async function fetchFoods() {
  try {
    const response = await api.get('/foods')
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### 3. Database Changes

**To add a new table:**

1. Create entity class in `backend/src/main/java/com/bff/entity/`
2. Update `docker/init.sql` with table definition
3. Add repository in `backend/src/main/java/com/bff/repository/`
4. Restart MySQL or run schema update

**Column naming:** 
- Use snake_case in SQL
- Use camelCase in Java entities
- JPA automatically handles mapping

## Project Structure Best Practices

### Backend
- **Entities:** Pure data models with JPA annotations
- **DTOs:** Request/response objects, never share entities
- **Services:** Business logic, transactions
- **Repositories:** Data access only
- **Controllers:** HTTP handling only, delegate to services
- **Exceptions:** Custom exceptions for specific cases
- **Security:** Authentication in filters, authorization in controllers

### Frontend
- **Components:** Reusable UI elements
- **Pages:** Full-page components (routes)
- **Store:** Redux for global state (auth, cart, ui)
- **API:** Centralized API client with interceptors
- **Hooks:** Custom hooks for reusable logic
- **Utils:** Helper functions

## Common Issues & Solutions

### Backend Issues

**JWT Token not working:**
- Ensure token is in `Authorization: Bearer <token>` header
- Check token expiration
- Verify JWT_SECRET matches in all places

**Database connection fails:**
- Check MySQL is running
- Verify credentials in application.yml
- Check database exists

**CORS errors:**
- Frontend and backend should be on different ports
- Backend has CORS configured in SecurityConfig
- Verify allowed origins

### Frontend Issues

**API calls failing:**
- Check backend is running
- Verify VITE_API_URL is correct
- Check network tab in DevTools
- Verify Authorization header is sent

**State not updating:**
- Ensure Redux dispatch is called
- Check selector is accessing correct state path
- Verify reducer logic

**Styling not applied:**
- Clear node_modules and reinstall
- Rebuild Tailwind CSS
- Check class names match Tailwind

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/feature-name

# Create pull request on GitHub
```

## Performance Tips

### Backend
- Use pagination for large data sets
- Add database indexes for frequently queried columns
- Cache responses when appropriate
- Use select queries instead of lazy loading
- Monitor query performance in logs

### Frontend
- Lazy load components with React.lazy()
- Memoize expensive components
- Use virtualization for long lists
- Optimize images
- Monitor performance in DevTools

## Security Reminders

- Never commit .env files
- Use environment variables for secrets
- Validate input on both frontend and backend
- Use HTTPS in production
- Regenerate JWT_SECRET for production
- Use strong passwords in database
- Keep dependencies updated
- Enable CORS only for trusted origins

## Debugging

### Backend
```bash
# View application logs
docker-compose logs -f backend

# Enable debug logging
# Add to application.yml:
# logging:
#   level:
#     com.bff: DEBUG
```

### Frontend
```bash
# DevTools in browser (F12)
# Redux DevTools extension for Chrome/Firefox
# React DevTools extension

# Network tab to inspect API calls
# Console tab for errors
```

## Additional Resources

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [JWT Docs](https://jwt.io)
- [MySQL Docs](https://dev.mysql.com/doc/)
