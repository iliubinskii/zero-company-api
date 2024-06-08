import type { ExistingUser, UserUpdate } from "../../schema";
import { assertDefined, assertNotNull } from "../../utils";
import { createUsersService } from "./service";
import { faker } from "@faker-js/faker";
import { getUserModel } from "./model";

describe("createUsersService", () => {
  const usersService = createUsersService();

  const getData = (): Omit<ExistingUser, "_id"> => {
    return {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };
  };

  const getUpdate = (): UserUpdate => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };
  };

  const toObject = (obj: unknown): unknown =>
    // eslint-disable-next-line unicorn/prefer-structured-clone -- Ok
    JSON.parse(JSON.stringify(obj));

  describe("addUser", () => {
    const data = getData();

    it("should add a user", async () => {
      const user = await usersService.addUser(data);

      expect(toObject(user)).toStrictEqual({
        ...data,
        _id: assertNotNull(user)._id.toString()
      });
    });

    it("should return undefined for duplicate email", async () => {
      const user = await usersService.addUser(data);

      expect(user).toBeNull();
    });
  });

  describe("deleteUser", () => {
    describe("By email", () => {
      const data = getData();

      beforeAll(async () => {
        await usersService.addUser(data);
      });

      it("should delete a user", async () => {
        const result = await usersService.deleteUser({
          email: data.email,
          type: "email"
        });

        expect(result).toBe(1);
      });

      it("should return 0 affected rows for missing user", async () => {
        const result = await usersService.deleteUser({
          email: data.email,
          type: "email"
        });

        expect(result).toBe(0);
      });
    });

    describe("By id", () => {
      const data = getData();

      let id: string | undefined;

      beforeAll(async () => {
        const user = await usersService.addUser(data);

        id = assertNotNull(user)._id.toString();
      });

      it("should delete a user", async () => {
        const result = await usersService.deleteUser({
          id: assertDefined(id),
          type: "id"
        });

        expect(result).toBe(1);
      });

      it("should return 0 affected rows for missing user", async () => {
        const result = await usersService.deleteUser({
          id: assertDefined(id),
          type: "id"
        });

        expect(result).toBe(0);
      });
    });
  });

  describe("getUser", () => {
    describe("By email", () => {
      const data = getData();

      beforeAll(async () => {
        await usersService.addUser(data);
      });

      it("should get a user", async () => {
        const user = await usersService.getUser({
          email: data.email,
          type: "email"
        });

        expect(toObject(user)).toEqual({
          ...data,
          _id: assertNotNull(user)._id.toString()
        });
      });

      it("should return undefined for missing user", async () => {
        const user = await usersService.getUser({
          email: faker.internet.email(),
          type: "email"
        });

        expect(user).toBeNull();
      });
    });

    describe("By id", () => {
      const data = getData();

      let id: string | undefined;

      beforeAll(async () => {
        const user = await usersService.addUser(data);

        id = assertNotNull(user)._id.toString();
      });

      it("should get a user", async () => {
        const user = await usersService.getUser({
          id: assertDefined(id),
          type: "id"
        });

        expect(toObject(user)).toEqual({
          ...data,
          _id: assertNotNull(user)._id.toString()
        });
      });

      it("should return undefined for missing user", async () => {
        const user = await usersService.getUser({
          id: faker.database.mongodbObjectId(),
          type: "id"
        });

        expect(user).toBeNull();
      });
    });
  });

  describe("getUsers", () => {
    const dataArray = faker.helpers
      .uniqueArray(() => faker.internet.email(), 10)
      .map(email => {
        return {
          email,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName()
        };
      });

    beforeAll(async () => {
      const UserModel = await getUserModel();

      await UserModel.deleteMany({});

      await Promise.all(
        dataArray.map(async data => {
          await usersService.addUser(data);
        })
      );
    });

    it("should get all users", async () => {
      const users = await usersService.getUsers();

      expect(users.count).toBe(dataArray.length);
      expect(users.docs.length).toBe(dataArray.length);
      expect(users.nextCursor).toBeUndefined();
      expect(users.total).toBe(dataArray.length);
    });

    it("should get one user", async () => {
      const users = await usersService.getUsers({ limit: 1 });

      expect(users.count).toBe(1);
      expect(users.docs.length).toBe(1);
      expect(users.nextCursor).toBeUndefined();
      expect(users.total).toBe(dataArray.length);
    });

    it("should get all but one user", async () => {
      const users = await usersService.getUsers({ offset: 1 });

      expect(users.count).toBe(dataArray.length - 1);
      expect(users.docs.length).toBe(dataArray.length - 1);
      expect(users.nextCursor).toBeUndefined();
      expect(users.total).toBe(dataArray.length);
    });

    it("should get slices of users", async () => {
      const [slice1, slice2, slice3] = await Promise.all([
        usersService.getUsers({ limit: 7, offset: 2 }),
        usersService.getUsers({ limit: 3, offset: 2 }),
        usersService.getUsers({ limit: 4, offset: 5 })
      ]);

      expect(slice1.count).toBe(7);
      expect(slice1.docs).toStrictEqual([...slice2.docs, ...slice3.docs]);
      expect(slice1.nextCursor).toBeUndefined();
      expect(slice1.total).toBe(dataArray.length);
    });
  });

  describe("updateUser", () => {
    describe("By email", () => {
      const data = getData();

      beforeAll(async () => {
        await usersService.addUser(data);
      });

      it("should update a user", async () => {
        const update = getUpdate();

        const user = await usersService.updateUser(
          {
            email: data.email,
            type: "email"
          },
          update
        );

        expect(toObject(user)).toEqual({
          ...data,
          ...update,
          _id: assertNotNull(user)._id.toString()
        });
      });

      it("should return undefined for missing user", async () => {
        const update = getUpdate();

        const user = await usersService.updateUser(
          {
            email: faker.internet.email(),
            type: "email"
          },

          update
        );

        expect(user).toBeNull();
      });
    });

    describe("By id", () => {
      const data = getData();

      let id: string | undefined;

      beforeAll(async () => {
        const user = await usersService.addUser(data);

        id = assertNotNull(user)._id.toString();
      });

      it("should update a user", async () => {
        const update = getUpdate();

        const user = await usersService.updateUser(
          {
            id: assertDefined(id),
            type: "id"
          },
          update
        );

        expect(toObject(user)).toEqual({
          ...data,
          ...update,
          _id: assertNotNull(user)._id.toString()
        });
      });

      it("should return undefined for missing user", async () => {
        const update = getUpdate();

        const user = await usersService.updateUser(
          {
            id: faker.database.mongodbObjectId(),
            type: "id"
          },

          update
        );

        expect(user).toBeNull();
      });
    });
  });
});
