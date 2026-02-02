import { ENV } from "./config/env";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import healthRoute from "./routes/health.route";
import authRoute from "./routes/auth.route";
import messageRoute from "./routes/message.route";
import { globalErrorHandler } from "./middlewares/error.middleware";

const app = express();

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// CORS
app.use(
  cors({
    origin: ENV.NODE_ENV === "development" ? ["http://localhost:3000"] : [ENV.CORS_ORIGIN],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

// Cookies
app.use(cookieParser());

// Routes
app.use("/api/v1/health", healthRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/message", messageRoute);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
