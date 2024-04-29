import { MONGODB_MAX_LIMIT } from "../consts";
import { UserModel } from "./model";
import { UsersService } from "../types";

/**
 * Creates a MongoDB service for users.
 * @returns A MongoDB service for users.
 */
export function createUsersService(): UsersService {
  return {
    addUser: async user => {
      const model = new UserModel(user);

      const addedUser = await model.save();

      const { _id, ...rest } = addedUser.toObject();

      return { _id: _id.toString(), ...rest };
    },
    deleteUser: async email => {
      const deletedUser = await UserModel.findOneAndDelete({ email });

      return deletedUser ? 1 : 0;
    },
    getUser: async email => {
      const user = await UserModel.findOne({ email });

      if (user) {
        const { _id, ...rest } = user.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    },
    getUsers: async ({ limit = MONGODB_MAX_LIMIT.users, offset = 0 } = {}) => {
      const [users, total] = await Promise.all([
        UserModel.find().skip(offset).limit(limit),
        UserModel.countDocuments()
      ]);

      return {
        docs: users.map(user => {
          const { _id, ...rest } = user.toObject();

          return { _id: _id.toString(), ...rest };
        }),
        total
      };
    },
    updateUser: async (email, user) => {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { $set: user },
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
