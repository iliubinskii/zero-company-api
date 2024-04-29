import { User } from "../schema";
import mongoose, { InferSchemaType } from "mongoose";

const Schema = new mongoose.Schema(
  {
    email: { required: true, type: String, unique: true },
    firstName: { required: true, type: String },
    lastName: { required: true, type: String }
  },
  { versionKey: false }
);

export const UserModel = mongoose.model<User>("User", Schema);

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export function typeCheck(value: InferSchemaType<typeof Schema>): User {
  return value;
}
