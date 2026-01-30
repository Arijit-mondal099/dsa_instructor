import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV as string,
  CORS_ORIGIN: process.env.CORS_ORIGIN as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY as string,
  GEMINI_MODEL: process.env.GEMINI_MODEL as string,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY as string,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET as string,
  JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY as string,
  GEMINI_SYSTEM_PROMPT: process.env.GEMINI_SYSTEM_PROMPT as string,
};
