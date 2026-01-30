import { Model, Schema, model, models } from "mongoose";
import { IAuth } from "../types";
import bcrypt from "bcrypt";

const authSchema = new Schema<IAuth>(
  {
    username: {
      type: String,
      minLength: 6,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
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

export const AuthModel: Model<IAuth> =
  (models.Auth as Model<IAuth>) || model<IAuth>("Auth", authSchema);
