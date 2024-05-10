import { Equals } from "ts-toolbelt/out/Any/Equals";
import { User } from "../../schema";
import { getMongodbConnection } from "../../providers";
import mongoose from "mongoose";

const Schema = {
  email: { required: true, type: String, unique: true },
  firstName: { required: true, type: String },
  lastName: { required: true, type: String }
} as const;

export const { getUserModel } = userModelSingleton();

/**
 * Creates a user model singleton.
 * @returns A user model singleton.
 */
function userModelSingleton(): UserModelSingleton {
  let model: mongoose.Model<User> | undefined;

  return {
    getUserModel: async (): Promise<mongoose.Model<User>> => {
      const connection = await getMongodbConnection();

      model =
        model ??
        connection.model<User>(
          "User",
          new mongoose.Schema<User>(Schema, { versionKey: false })
        );

      return model;
    }
  };
}

interface UserModelSingleton {
  readonly getUserModel: () => Promise<mongoose.Model<User>>;
}

// Type check the user schema
((): Equals<keyof typeof Schema, keyof User> => 1)();
