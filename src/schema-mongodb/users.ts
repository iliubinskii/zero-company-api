import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: mongoose.Schema.Types.String,
      unique: true
    },
    favoriteCompanies: {
      type: [mongoose.Schema.Types.ObjectId]
    },
    firstName: {
      type: mongoose.Schema.Types.String
    },
    lastName: {
      type: mongoose.Schema.Types.String
    }
  },
  { versionKey: false }
);

/**
 * Creates a user model.
 * @param connection - The mongoose connection.
 * @returns A user model.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export function getUserModel(connection: typeof mongoose) {
  return connection.model("User", UserSchema);
}

export type UserModel = ReturnType<typeof getUserModel>;
