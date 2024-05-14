import { assertDefined } from "../../utils";
import { createUsersService } from "./service";
import { faker } from "@faker-js/faker";
import { getUserModel } from "./model";

describe("createUsersService", () => {
  const usersService = createUsersService();

  describe("addUser", () => {
    const data = {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };

    it("should add a user", async () => {
      const user = await usersService.addUser(data);

      const { _id } = assertDefined(user);

      expect(user).toStrictEqual({ ...data, _id });
    });

    it("should return undefined for duplicate email", async () => {
      const user = await usersService.addUser(data);

      expect(user).toBeUndefined();
    });
  });

  describe("deleteUser", () => {
    const data = {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };

    beforeAll(async () => {
      await usersService.addUser(data);
    });

    it("should delete a user", async () => {
      const result = await usersService.deleteUser(data.email);

      expect(result).toBe(1);
    });

    it("should return 0 affected rows for missing user", async () => {
      const result = await usersService.deleteUser(data.email);

      expect(result).toBe(0);
    });
  });

  describe("getUser", () => {
    const data = {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };

    beforeAll(async () => {
      await usersService.addUser(data);
    });

    it("should get a user", async () => {
      const user = await usersService.getUser(data.email);

      const { _id } = assertDefined(user);

      expect(user).toEqual({ ...data, _id });
    });

    it("should return undefined for missing user", async () => {
      const user = await usersService.getUser(faker.internet.email());

      expect(user).toBeUndefined();
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
    const data = {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };

    const update = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };

    beforeAll(async () => {
      await usersService.addUser(data);
    });

    it("should update a user", async () => {
      const user = await usersService.updateUser(data.email, update);

      const { _id } = assertDefined(user);

      expect(user).toEqual({ ...data, ...update, _id });
    });

    it("should return undefined for missing user", async () => {
      const user = await usersService.updateUser(
        faker.internet.email(),
        update
      );

      expect(user).toBeUndefined();
    });
  });
});
