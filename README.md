# Chatbot Server

A Node.js-based chatbot server with AI integration, Twilio messaging support, and EdX API integration.

## Features

- 🤖 AI-powered chatbot using OpenAI
- 📱 Twilio SMS integration
- 🎓 EdX API integration for course management
- 🔐 Auth0 authentication
- 🗄️ PostgreSQL database with Sequelize ORM
- 🧪 Comprehensive testing with Jest
- 🐳 Docker support for easy development
- 📝 API documentation

## Prerequisites

- Node.js 20.19.2 or higher
- PostgreSQL 15 or higher
- Docker and Docker Compose (for containerized development)
- pnpm package manager

## Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd chatbot
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Setup
Copy the environment example files and configure them:

```bash
cp env.example .env
cp docker.env.example .docker/.env
```

Edit `.env` and `.docker/.env` with your actual configuration values.

### 4. Database Setup
```bash
# Create database
pnpm db:create

# Run migrations
pnpm db:migrate

# Seed with demo data (optional)
pnpm db:seed:all
```

### 5. Start the server
```bash
# Development mode
pnpm dev

# Production mode
pnpm serve
```

## Docker Development

For containerized development:

```bash
# Build and start containers
./scripts/rebuild.sh
./scripts/start.sh

# Stop containers
./scripts/stop.sh
```

## API Endpoints

### Chatbot
- `POST /chatbot/message` - Send a message to the chatbot
- `GET /chatbot/history` - Get chat history
- `GET /chatbot/health` - Health check

### Messaging
- `POST /messaging/webhook/incoming-message` - Twilio webhook
- `GET /messaging` - Messaging service status

### Authentication
- `GET /auth/login` - Login endpoint

### EdX Integration
- `GET /edx/courses` - Get available courses

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests in verbose mode
pnpm test:verbose
```

## Database Management

```bash
# Create database
pnpm db:create

# Generate model
pnpm db:create-model

# Generate migration
pnpm db:generate-migration

# Run migrations
pnpm db:migrate

# Undo last migration
pnpm db:undo-migration

# Rollback all migrations
pnpm db:rollback-migrations

# Drop database
pnpm db:drop
```

## Linting

```bash
# Check code quality
pnpm lint

# Auto-fix issues
pnpm lint:fix
```

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middlewares/     # Express middlewares
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
└── validations/     # Input validation schemas
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment | No | `development` |
| `PORT` | Server port | No | `3001` |
| `APP_URL` | Application URL | Yes | - |
| `POSTGRES_HOST` | Database host | Yes | - |
| `POSTGRES_PORT` | Database port | No | `5432` |
| `POSTGRES_USER` | Database user | Yes | - |
| `POSTGRES_PASSWORD` | Database password | Yes | - |
| `POSTGRES_DB` | Database name | Yes | - |
| `AUTH0_DOMAIN` | Auth0 domain | Yes | - |
| `AUTH0_CLIENT_ID` | Auth0 client ID | Yes | - |
| `AUTH0_CLIENT_SECRET` | Auth0 client secret | Yes | - |
| `AUTH0_AUDIENCE` | Auth0 audience | Yes | - |
| `AUTH0_ISSUER_BASE_URL` | Auth0 issuer URL | Yes | - |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Yes | - |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Yes | - |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | Yes | - |
| `EDX_API_KEY` | EdX API key | Yes | - |
| `EDX_API_URL` | EdX API URL | Yes | - |
| `EDX_CLIENT_ID` | EdX client ID | Yes | - |
| `EDX_CLIENT_SECRET` | EdX client secret | Yes | - |
| `AI_API_KEY` | OpenAI API key | Yes | - |
| `AI_MODEL` | AI model to use | No | `gpt-4` |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.