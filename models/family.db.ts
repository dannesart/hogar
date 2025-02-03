import { model, Model, Schema } from "mongoose";
import type { Family } from "./family";

const FamilyDbSchema: Schema<Family> = new Schema({
  title: String,
  createdBy: String,
  created: { type: Date, default: Date.now },
  updatedBy: String,
  updated: { type: Date, default: Date.now },
  members: [String],
  invites: [String],
});

const FamilyModel: Model<Family> = model("families", FamilyDbSchema);

export { FamilyModel };
