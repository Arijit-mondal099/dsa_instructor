import { model, Model, models, Schema } from "mongoose";
import { ITab } from "../types";

const tabSchema = new Schema<ITab>(
  {
    title: {
      type: String,
      requried: true,
      trim: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "Auth" },
    content: [],
  },
  { timestamps: true },
);

export const TabModel: Model<ITab> =
  (models.Tab as Model<ITab>) || model<ITab>("Tab", tabSchema);
