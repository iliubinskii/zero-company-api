import { getMongodbConnection } from "../providers";
import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: mongoose.Schema.Types.String,
      unique: true
    },
    firstName: {
      required: true,
      type: mongoose.Schema.Types.String
    },
    lastName: {
      required: true,
      type: mongoose.Schema.Types.String
    }
  },
  { versionKey: false }
);

/**
 * Creates a user model.
 * @returns A user model.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export async function getUserModel() {
  const connection = await getMongodbConnection();

  return connection.model("User", UserSchema);
}

export type UserModel = Awaited<ReturnType<typeof getUserModel>>;
