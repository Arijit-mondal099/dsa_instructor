import express from "express";
import cors from "cors";
import healthRoute from "./routes/health.route";
import authRoute from "./routes/auth.route";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { ENV } from "./config/env";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(
  cors({
    origin: ENV.NODE_ENV === "dev" ? ["http://localhost:3000", "http://localhost:5173"] : ENV.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use("/api/v1/health", healthRoute);
app.use("/api/v1/auth", authRoute);

app.use(globalErrorHandler);

export default app;
