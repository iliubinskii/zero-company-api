import { MAX_LIMIT } from "../../schema";
import { MONGODB_ERROR } from "../../consts";
import type { UsersService } from "../../types";
import { getUserModel } from "./model";
import { toObject } from "../../utils";

/**
 * Creates a MongoDB service for users.
 * @returns A MongoDB service for users.
 */
export function createUsersService(): UsersService {
  return {
    addUser: async user => {
      try {
        const UserModel = await getUserModel();

        const model = new UserModel(user);

        const addedUser = await model.save();

        return toObject(addedUser);
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          err.code === MONGODB_ERROR.DUPLICATE_KEY
        )
          return undefined;

        throw err;
      }
    },
    deleteUser: async ref => {
      const UserModel = await getUserModel();

      const deletedUser = await (() => {
        switch (ref.type) {
          case "id": {
            return UserModel.findByIdAndDelete(ref.id);
          }

          case "email": {
            return UserModel.findOneAndDelete({ email: ref.email });
          }
        }
      })();

      return deletedUser ? 1 : 0;
    },
    getUser: async ref => {
      const UserModel = await getUserModel();

      const user = await (() => {
        switch (ref.type) {
          case "id": {
            return UserModel.findById(ref.id);
          }

          case "email": {
            return UserModel.findOne({ email: ref.email });
          }
        }
      })();

      return user ? toObject(user) : undefined;
    },
    getUsers: async ({ limit = MAX_LIMIT, offset = 0 } = {}) => {
      const UserModel = await getUserModel();

      // eslint-disable-next-line no-warning-comments -- Postponed
      // TODO: Use a single aggregate query to get both the count and the documents
      const [users, total] = await Promise.all([
        UserModel.find().skip(offset).limit(limit),
        UserModel.countDocuments()
      ]);

      return {
        count: users.length,
        docs: users.map(toObject),
        total
      };
    },
    updateUser: async (ref, user) => {
      const UserModel = await getUserModel();

      const updatedUser = await (() => {
        switch (ref.type) {
          case "id": {
            return UserModel.findByIdAndUpdate(ref.id, user, {
              new: true
            });
          }

          case "email": {
            return UserModel.findOneAndUpdate({ email: ref.email }, user, {
              new: true
            });
          }
        }
      })();

      return updatedUser ? toObject(updatedUser) : undefined;
    }
  };
}
