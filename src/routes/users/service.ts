import type { User, UserUpdate } from "../../schema";
import { MAX_LIMIT } from "../../schema";
import type { UsersService } from "../../types";
import { createCrudService } from "../../services";
import { getUserModel } from "./model";

/**
 * Creates a MongoDB service for users.
 * @returns A MongoDB service for users.
 */
export function createUsersService(): UsersService {
  const crudService = createCrudService<User, UserUpdate>(getUserModel);

  return {
    addUser: crudService.addItem,
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

      if (user) {
        const { _id, ...rest } = user.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    },
    getUsers: async ({ limit = MAX_LIMIT, offset = 0 } = {}) => {
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

      if (updatedUser) {
        const { _id, ...rest } = updatedUser.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    }
  };
}
