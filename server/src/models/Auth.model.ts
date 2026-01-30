import { Model, Schema, model, models } from "mongoose";
import { IAuth } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

const authSchema = new Schema<IAuth>(
  {
    username: {
      type: String,
      minLength: 6,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
      trim: true,
    },
    chatHistory: [{ type: Schema.Types.ObjectId, ref: "Tab" }],
    refreshToken: String,
  },
  { timestamps: true },
);

authSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw new Error("Password encryption failed");
  }
});

authSchema.methods.comparePassword = async function (plain: string) {
  return bcrypt.compare(plain, this.password);
};

authSchema.methods.generateAccessToken = function (): string {
  try {
    if (!ENV.JWT_ACCESS_TOKEN_SECRET) {
      throw new Error("JWT secret not configured");
    }

    return jwt.sign(
      {
        id: this._id.toString(),
        email: this.email,
        username: this.username,
      },
      ENV.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRY as any,
      },
    );
  } catch (err) {
    throw new Error("Failed to generate access token");
  }
};

authSchema.methods.generateRefreshToken = function () {
  try {
    if (!ENV.JWT_REFRESH_TOKEN_SECRET) {
      throw new Error("JWT secret not configured");
    }

    return jwt.sign(
      {
        id: this._id,
      },
      ENV.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRY as any,
      },
    );
  } catch (err) {
    throw new Error("Failed to generate refresh token");
  }
};

export const AuthModel: Model<IAuth> =
  (models.Auth as Model<IAuth>) || model<IAuth>("Auth", authSchema);
