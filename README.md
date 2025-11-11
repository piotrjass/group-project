# Flashcards Learning Application

A modern full-stack application for learning programming concepts through interactive flashcards and quizzes. Built with Next.js, .NET 9, and PostgreSQL.

## Features

- **Landing Page**: Beautiful, responsive landing page with features showcase
- **Authentication**:
  - User registration and login
  - JWT-based authentication
  - Two-factor authentication (2FA) with codes displayed in console
- **Flashcards Module**:
  - 50 flashcards across 5 categories (SQL, .NET, Java, JavaScript, Python)
  - Interactive flip animation
  - Easy navigation between cards
- **Tests Module**:
  - Multiple-choice quizzes
  - Instant results with detailed feedback
  - Test history tracking
- **Progress Tracking**: View your test history and performance over time

## Tech Stack

### Backend
- .NET 9 (ASP.NET Core)
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- BCrypt for password hashing

### Frontend
- Next.js 15
- React 19
- TypeScript
- CSS Modules
- Axios for API calls

### Infrastructure
- Docker & Docker Compose
- PostgreSQL 16

## Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git (optional)

### Running the Application

1. Navigate to the project directory:
```bash
cd group-project
```

2. Start all services with Docker Compose:
```bash
docker-compose up --build
```

3. Wait for all services to start. You should see:
   - PostgreSQL running on port 5432
   - Backend API running on http://localhost:5000
   - Frontend running on http://localhost:3000

4. Open your browser and visit:
   - Frontend: http://localhost:3000
   - API Documentation (Swagger): http://localhost:5000/swagger

### First Time Setup

1. Register a new account on http://localhost:3000/register
2. After registration, you'll be prompted to set up 2FA
3. **IMPORTANT**: Check the Docker console logs to see your 2FA code
4. Save this code - you'll need it every time you log in
5. Log in with your credentials
6. Enter your 2FA code when prompted
7. Start learning!

## Project Structure

```
group-project/
├── client/                 # Next.js frontend
│   ├── app/               # Next.js app router pages
│   │   ├── page.tsx       # Landing page
│   │   ├── register/      # Registration page
│   │   ├── login/         # Login page
│   │   ├── setup-2fa/     # 2FA setup page
│   │   ├── verify-2fa/    # 2FA verification page
│   │   ├── dashboard/     # Main dashboard
│   │   ├── flashcards/    # Flashcards viewer
│   │   ├── test/          # Quiz interface
│   │   └── test-history/  # Test history
│   ├── lib/               # API client
│   ├── types/             # TypeScript types
│   └── __tests__/         # Jest tests
│
├── server/                # .NET 9 backend
│   ├── Controllers/       # API controllers
│   ├── Services/          # Business logic
│   ├── Models/            # Data models
│   ├── Data/              # Database context
│   ├── DTOs/              # Data transfer objects
│   └── Tests/             # XUnit tests
│
└── docker-compose.yml     # Docker orchestration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/setup-2fa/{userId}` - Setup 2FA
- `POST /api/auth/verify-2fa` - Verify 2FA code

### Flashcards
- `GET /api/flashcards/categories` - Get all categories
- `GET /api/flashcards/category/{categoryId}` - Get flashcards by category
- `GET /api/flashcards/{id}` - Get single flashcard

### Tests
- `GET /api/tests/generate/{categoryId}` - Generate test questions
- `POST /api/tests/submit` - Submit test answers
- `GET /api/tests/history` - Get test history

## Running Tests

### Backend Tests
```bash
cd server
dotnet test
```

### Frontend Tests
```bash
cd client
npm test
```

## Development

### Backend Development
```bash
cd server
dotnet watch run
```

### Frontend Development
```bash
cd client
npm run dev
```

## Database

The database is automatically initialized with:
- 5 categories: SQL, .NET, Java, JavaScript, Python
- 10 flashcards per category (50 total)
- Entity Framework migrations are applied on startup

## 2FA Implementation

This application uses a simplified 2FA system for demonstration:
- Codes are 6-digit numbers
- Codes are displayed in the server console logs
- In production, these would be sent via SMS or authenticator app

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (appsettings.json)
- Database connection string
- JWT secret key
- JWT issuer and audience

## Security Notes

- Passwords are hashed using BCrypt
- JWT tokens expire after 60 minutes
- All API endpoints (except auth) require authentication
- 2FA is enforced for all users

## Stopping the Application

Press `Ctrl+C` in the terminal where docker-compose is running, then:

```bash
docker-compose down
```

To remove all data:
```bash
docker-compose down -v
```

## Troubleshooting

### Port already in use
If ports 3000, 5000, or 5432 are already in use, you can change them in `docker-compose.yml`.

### Database connection issues
Make sure PostgreSQL container is healthy before the API starts. The docker-compose file includes health checks.

### 2FA code not visible
Check the Docker logs:
```bash
docker-compose logs server
```

## License

This is a learning project created for educational purposes.

## Author

Created with Claude Code
