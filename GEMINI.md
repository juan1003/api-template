# GEMINI.md - API Server Template (Production Ready)

This project is a high-performance, TypeScript-based API server template built with Express, Prisma, and Bun. It has been architected for production use, prioritizing robustness, security, and observability.

## Project Overview

- **Core Tech:** TypeScript, Node.js (Bun Runtime), Express, Prisma (ORM), PostgreSQL.
- **Architecture:** Layered Controller-Service-Repository pattern with cross-cutting concerns handled by middleware.
- **Security:** Helmet, CORS, Rate Limiting, Zod Validation, Bcrypt (12 rounds).
- **Observability:** Structured logging with Winston and global error handling.
- **Testing:** Integrated unit and integration testing using `bun:test` and `supertest`.

## Key Components

### 1. Configuration (`src/config/env.ts`)
- Strict environment variable validation using Zod.
- Ensures the server won't start if critical configuration (like `DATABASE_URL` or `JWT_SECRET`) is missing or malformed.

### 2. Validation (`src/middleware/validate.ts`)
- Request bodies, parameters, and queries are validated against Zod schemas before reaching the controller.
- Returns consistent 400 Bad Request responses with detailed error objects.

### 3. Error Handling (`src/middleware/errorHandler.ts`)
- Centralized interceptor for all operational and unexpected errors.
- Prevents implementation leak in production while providing detailed logs.
- Uses custom `AppError` subclasses for semantic error reporting.

### 4. Database & Logging
- **Shared Prisma:** A single, shared `PrismaClient` instance is exported from `src/lib/prisma.ts` to manage connection pooling efficiently.
- **Winston Logger:** Provides structured, leveled logging (JSON format in production, colorized in development).

## Building and Running

### Prerequisites
- [Bun](https://bun.sh/)
- PostgreSQL database

### Initial Setup
1. `bun install`
2. Create `.env` with `DATABASE_URL` and `JWT_SECRET`.
3. `bun prisma generate`
4. `bun prisma migrate dev`

### Commands
- `bun start`: Run in production mode.
- `bun run dev`: Run with auto-reload (using nodemon).
- `bun test`: Execute the test suite.

## Development Conventions

- **No Manual Try-Catch:** Use `express-async-errors` and let the global error handler manage failures.
- **Semantic Errors:** Throw specialized errors from `src/lib/errors.ts` (e.g., `ConflictError`, `AuthenticationError`).
- **Input Validation:** Always define a Zod schema for any new endpoint and apply the `validate` middleware.
- **Repository Pattern:** Keep database logic isolated in repositories. Always use the shared `prisma` instance.
