import express from "express";
import cors from "cors";
import healthRoute from "./routes/health.route";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use("/api/v1", healthRoute);

export default app;
