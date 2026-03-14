import "express-async-errors";
import express from "express";
import cp from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import AccountController from "./controllers/accountController";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./config/env";
import { logger } from "./lib/logger";

const app = express();
const port = env.PORT;

// Security Middleware
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Parsers & Logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cp());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

// Routes
const accountController = new AccountController();
app.use("/account", accountController.router);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", env: env.NODE_ENV });
});

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server started in ${env.NODE_ENV} mode on http://localhost:${port}`);
});

export default app;
