import { model, Model, Schema } from "mongoose";
import type { User } from "./user";

const UserDbSchema: Schema<User> = new Schema({
  displayName: String,
  id: String,
  providerId: String,
  status: String,
  picture: String,
});

const UserModel: Model<User> = model("profile", UserDbSchema);

export { UserModel };
