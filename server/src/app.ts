import { ENV } from "./config/env";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import healthRoute from "./routes/health.route";
import authRoute from "./routes/auth.route";
import messageRoute from "./routes/message.route";
import { globalErrorHandler } from "./middlewares/error.middleware";

const app = express();

/**
 * REQUIRED for Render / any reverse proxy
 * Allows secure cookies to work correctly
 */
app.set("trust proxy", 1);

/**
 * Body parsers
 */
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

/**
 * CORS
 */
const allowedOrigins = ENV.NODE_ENV === "development" 
                        ? ["http://localhost:3000", "http://localhost:5173"] 
                        : [ENV.CORS_ORIGIN, "https://dsa-instructor-liart.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server calls, postman, health checks
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/**
 * Cookies
 */
app.use(cookieParser());

/**
 * Routes
 */
app.use("/api/v1/health", healthRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/message", messageRoute);

/**
 * Global Error Handler
 */
app.use(globalErrorHandler);

export default app;
