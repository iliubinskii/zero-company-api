import { MAX_LIMIT } from "../../schema";
import { MONGODB_ERROR } from "../../consts";
import { UsersService } from "../../types";
import { buildMongodbQuery } from "../../utils";
import { getUserModel } from "./model";

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

        const { _id, ...rest } = addedUser.toObject();

        return { _id: _id.toString(), ...rest };
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
    deleteUser: async email => {
      const UserModel = await getUserModel();

      const deletedUser = await UserModel.findOneAndDelete({ email });

      return deletedUser ? 1 : 0;
    },
    getUser: async email => {
      const UserModel = await getUserModel();

      const user = await UserModel.findOne({ email });

      if (user) {
        const { _id, ...rest } = user.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    },
    getUsers: async ({ limit = MAX_LIMIT.users, offset = 0 } = {}) => {
      const UserModel = await getUserModel();

      const [users, total] = await Promise.all([
        UserModel.find().skip(offset).limit(limit),
        UserModel.countDocuments()
      ]);

      return {
        count: users.length,
        docs: users.map(user => {
          const { _id, ...rest } = user.toObject();

          return { _id: _id.toString(), ...rest };
        }),
        total
      };
    },
    updateUser: async (email, user) => {
      const UserModel = await getUserModel();

      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        buildMongodbQuery(user),
        { new: true }
      );

      if (updatedUser) {
        const { _id, ...rest } = updatedUser.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    }
  };
}
