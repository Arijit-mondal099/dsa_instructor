import { ObjectId, Document, Types } from "mongoose";

export interface IAuth extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(plain: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface ITab extends Document {
  title: string;
  userId: Types.ObjectId;
  content: { role: "user" | "model"; text: string; }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: Types.ObjectId;
  username: string;
  email: string;
}
