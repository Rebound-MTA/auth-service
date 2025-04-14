import mongoose, { Schema, Document } from "mongoose";
import { User, Filters } from "@rebound-mta/common";

// Mongoose-compatible interface (drops "id", adds Document)
export interface IUser extends Document, Omit<User, "id"> {}

const FiltersSchema: Schema = new Schema<Filters>({
  category: { type: String, required: false },
  size: { type: String, required: false },
  condition: { type: String, required: false },
  type: { type: String, required: false },
  brand: { type: String, required: false },
});

const UserSchema: Schema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: [String], default: ["user"] },
  profile: {
    avatarUrl: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  preferences: { type: FiltersSchema, required: false },
});

export default mongoose.model<IUser>("User", UserSchema);
