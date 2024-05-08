import { Equals } from "ts-toolbelt/out/Any/Equals";
import { User } from "../../schema";
import mongoose from "mongoose";

const Schema = {
  email: { required: true, type: String, unique: true },
  firstName: { required: true, type: String },
  lastName: { required: true, type: String }
} as const;

export const UserModel = mongoose.model<User>(
  "User",
  new mongoose.Schema<User>(Schema, { versionKey: false })
);

// Type check the user schema
((): Equals<keyof typeof Schema, keyof User> => 1)();
