import { MAX_LIMIT } from "../../schema";
import { MONGODB_ERROR } from "../../consts";
import { MONGODB_RUN_VALIDATORS } from "../../config";
import type { UsersService } from "../../types";
import { getModels } from "../../schema-mongodb";

/**
 * Creates a MongoDB service for users.
 * @returns A MongoDB service for users.
 */
export function createUsersService(): UsersService {
  return {
    addUser: async data => {
      try {
        const { UserModel } = await getModels();

        const user = new UserModel(data);

        await user.save();

        return user;
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          err.code === MONGODB_ERROR.DUPLICATE_KEY
        )
          return null;

        throw err;
      }
    },
    deleteUser: async ref => {
      const { UserModel } = await getModels();

      const user = await (() => {
        switch (ref.type) {
          case "id": {
            return UserModel.findByIdAndDelete(ref.id);
          }

          case "email": {
            return UserModel.findOneAndDelete({ email: ref.email });
          }
        }
      })();

      return user ? 1 : 0;
    },
    getUser: async ref => {
      const { UserModel } = await getModels();

      return (() => {
        switch (ref.type) {
          case "id": {
            return UserModel.findById(ref.id);
          }

          case "email": {
            return UserModel.findOneAndUpdate(
              { email: ref.email },
              {},
              { new: true, upsert: true }
            );
          }
        }
      })();
    },
    getUsers: async ({ limit = MAX_LIMIT, offset = 0 } = {}) => {
      const { UserModel } = await getModels();

      const [users, total] = await Promise.all([
        UserModel.find().skip(offset).limit(limit),
        UserModel.countDocuments()
      ]);

      return {
        count: users.length,
        docs: users,
        total
      };
    },
    updateUser: async (ref, user) => {
      const { UserModel } = await getModels();

      const { addFavoriteCompanies, removeFavoriteCompanies, ...rest } = user;

      const update: Record<string, unknown> = {};

      if (Object.keys(rest).length > 0) update["$set"] = rest;

      if (addFavoriteCompanies && addFavoriteCompanies.length > 0)
        update["$push"] = {
          favoriteCompanies: { $each: addFavoriteCompanies }
        };

      if (removeFavoriteCompanies && removeFavoriteCompanies.length > 0)
        update["$pull"] = {
          favoriteCompanies: { $in: removeFavoriteCompanies }
        };

      return (() => {
        switch (ref.type) {
          case "id": {
            return UserModel.findByIdAndUpdate(ref.id, update, {
              new: true,
              runValidators: MONGODB_RUN_VALIDATORS
            });
          }

          case "email": {
            return UserModel.findOneAndUpdate({ email: ref.email }, update, {
              new: true,
              runValidators: MONGODB_RUN_VALIDATORS
            });
          }
        }
      })();
    }
  };
}
