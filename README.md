# API Template 2.0 (Production Ready)

This is a high-performance, production-ready rewrite of the [API Template](https://github.com/juan1003/api-template) project using **TypeScript**, **Express**, **Prisma**, and **Bun**.

## Features

- **Production-Ready Architecture:** Layered Controller-Service-Repository pattern.
- **Robust Validation:** Strict input and environment validation using **Zod**.
- **Structured Logging:** Professional logging with **Winston**.
- **Global Error Handling:** Centralized interceptor with custom semantic error classes.
- **Security Hardened:** Includes **Helmet**, **CORS**, and **Rate Limiting**.
- **Integrated Testing:** Ready-to-use testing suite with **`bun:test`** and **Supertest**.
- **Modern Runtime:** Optimized for **Bun** but compatible with Node.js.

## Prerequisites

- [Bun](https://bun.sh/) (Recommended) or Node.js.
- PostgreSQL Database.

## Getting Started

### 1. Clone and Install
```shell
$ git clone https://github.com/juan1003/api-template.git
$ cd api-template/
$ bun install
```

### 2. Configure Environment
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"
JWT_SECRET="your-super-secret-key-at-least-10-chars"
PORT=8080
NODE_ENV="development"
```

### 3. Database Setup
```shell
$ bun prisma generate
$ bun prisma migrate dev
$ bun prisma db seed
```

## Available Commands

| Command | Description |
| :--- | :--- |
| `bun start` | Runs the server in production mode |
| `bun run dev` | Runs the server with auto-reload (Nodemon) |
| `bun test` | Executes the integration test suite |
| `bun prisma studio` | Opens Prisma's GUI to view/edit data |

## Documentation
For more detailed information on development conventions and architecture, please refer to [GEMINI.md](./GEMINI.md).

## Happy Hacking!
**Maintained by Juan De Jesús**
