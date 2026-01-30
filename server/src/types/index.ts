import { ObjectId, Document } from "mongoose";

export interface IAuth extends Document {
  username: string;
  email: string;
  password: string;
  chatHistory: ObjectId[];
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITab extends Document {
  title: string;
  userId: ObjectId;
  content: [{ role: "user" | "model"; text: string }];
  createdAt: Date;
  updatedAt: Date;
}
