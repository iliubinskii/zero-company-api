import { Equals } from "ts-toolbelt/out/Any/Equals";
import { User } from "../../schema";
import { getMongodbConnection } from "../../providers";
import mongoose from "mongoose";

const Schema = {
  email: { required: true, type: String, unique: true },
  firstName: { required: true, type: String },
  lastName: { required: true, type: String }
} as const;

export const getUserModel: GetUserModel = createSingleton();

export interface GetUserModel {
  (): Promise<mongoose.Model<User>>;
}

/**
 * Creates a user model singleton.
 * @returns A user model singleton.
 */
function createSingleton(): GetUserModel {
  let model: mongoose.Model<User> | undefined;

  return async () => {
    const connection = await getMongodbConnection();

    model =
      model ??
      connection.model<User>(
        "User",
        new mongoose.Schema<User>(Schema, { versionKey: false })
      );

    return model;
  };
}

// Type check the user schema
((): Equals<keyof typeof Schema, keyof User> => 1)();
