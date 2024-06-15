/* eslint-disable @typescript-eslint/no-unsafe-return -- Ok */

import { ErrorCode } from "../../schema";
import type { Jwt } from "../../schema";
import { StatusCodes } from "http-status-codes";
import type { UserRef } from "../../types";
import { createUserControllers } from "./controllers";
import express from "express";
import { faker } from "@faker-js/faker";
import request from "supertest";

describe("createUserControllers", () => {
  const jwt: Jwt = { email: faker.internet.email() };

  const userRef: UserRef = {
    id: faker.database.mongodbObjectId(),
    type: "id"
  };

  const mockUsersService = {
    addUser: jest.fn(),
    deleteUser: jest.fn(),
    getUser: jest.fn(),
    getUsers: jest.fn(),
    updateUser: jest.fn()
  };

  const mockCompaniesService = {
    addCompany: jest.fn(),
    deleteCompany: jest.fn(),
    generateFoundingAgreement: jest.fn(),
    getCompanies: jest.fn(),
    getCompany: jest.fn(),
    updateCompany: jest.fn()
  };

  const mockDocumentsService = {
    addDocument: jest.fn(),
    deleteDocument: jest.fn(),
    getDocument: jest.fn(),
    getDocuments: jest.fn(),
    updateDocument: jest.fn()
  };

  const controllers = createUserControllers(
    mockUsersService,
    mockCompaniesService,
    mockDocumentsService
  );

  const app = express();

  app.use(express.json());

  app.use((req, _res, next) => {
    req.jwt = jwt;
    req.userRef = userRef;
    next();
  });

  app
    .get("/users", controllers.getUsers)
    .post("/users", controllers.addUser)
    .get("/users/:id", controllers.getUser)
    .put("/users/:id", controllers.updateUser)
    .delete("/users/:id", controllers.deleteUser)
    .get("/users/:id/companies", controllers.getCompaniesByUser);

  describe("addUser", () => {
    it("should add a user and return 201", async () => {
      const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      };

      mockUsersService.addUser.mockImplementationOnce(u => u);

      const response = await request(app).post("/users").send(user);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual({ ...user, email: jwt.email });
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(app)
        .post("/users")
        .send({ invalid: "data" });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty("error", ErrorCode.InvalidData);
      expect(response.body).toHaveProperty("errorMessage");
    });

    it("should return 409 if user already exists", async () => {
      const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      };

      mockUsersService.addUser.mockResolvedValueOnce(undefined);

      const response = await request(app).post("/users").send(user);

      expect(response.status).toBe(StatusCodes.CONFLICT);
      expect(response.body).toHaveProperty("error", ErrorCode.AlreadyExists);
      expect(response.body).toHaveProperty("errorMessage");
    });
  });

  describe("deleteUser", () => {
    it("should get affected rows and return 200", async () => {
      mockUsersService.deleteUser.mockResolvedValueOnce(1);

      const response = await request(app).delete(
        `/users/${faker.database.mongodbObjectId()}`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({ affectedRows: 1 });
    });
  });

  describe("getCompaniesByUser", () => {
    it("should get companies by user and return 200", async () => {
      const companies = {
        count: 1,
        docs: [
          { _id: faker.database.mongodbObjectId(), name: faker.company.name() }
        ],
        total: 1
      };

      mockCompaniesService.getCompanies.mockResolvedValueOnce(companies);

      const response = await request(app).get(
        `/users/${faker.database.mongodbObjectId()}/companies`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(companies);
    });

    it("should return 400 for invalid query", async () => {
      const response = await request(app)
        .get(`/users/${faker.database.mongodbObjectId()}/companies`)
        .query({ invalid: "query" });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty("error", ErrorCode.InvalidQuery);
      expect(response.body).toHaveProperty("errorMessage");
    });
  });

  describe("getUser", () => {
    it("should get a user and return 200", async () => {
      const user = {
        _id: faker.database.mongodbObjectId(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      };

      mockUsersService.getUser.mockResolvedValueOnce(user);

      const response = await request(app).get(
        `/users/${faker.database.mongodbObjectId()}`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(user);
    });

    it("should return 404 if user not found", async () => {
      mockUsersService.getUser.mockResolvedValueOnce(undefined);

      const response = await request(app).get(
        `/users/${faker.database.mongodbObjectId()}`
      );

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toHaveProperty("error", ErrorCode.NotFound);
      expect(response.body).toHaveProperty("errorMessage");
    });
  });

  describe("getUsers", () => {
    it("should get users and return 200", async () => {
      const users = {
        count: 1,
        docs: [
          {
            _id: faker.database.mongodbObjectId(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
          }
        ],
        total: 1
      };

      mockUsersService.getUsers.mockResolvedValueOnce(users);

      const response = await request(app).get("/users");

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(users);
    });

    it("should return 400 for invalid query", async () => {
      const response = await request(app)
        .get("/users")
        .query({ invalid: "query" });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty("error", ErrorCode.InvalidQuery);
      expect(response.body).toHaveProperty("errorMessage");
    });
  });

  describe("updateUser", () => {
    it("should update a user and return 200", async () => {
      const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      };

      mockUsersService.updateUser.mockResolvedValueOnce(user);

      const response = await request(app)
        .put(`/users/${faker.database.mongodbObjectId()}`)
        .send(user);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(user);
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(app)
        .put(`/users/${faker.database.mongodbObjectId()}`)
        .send({ invalid: "data" });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty("error", ErrorCode.InvalidData);
      expect(response.body).toHaveProperty("errorMessage");
    });

    it("should return 404 if user not found", async () => {
      mockUsersService.updateUser.mockResolvedValueOnce(undefined);

      const response = await request(app).put(
        `/users/${faker.database.mongodbObjectId()}`
      );

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toHaveProperty("error", ErrorCode.NotFound);
      expect(response.body).toHaveProperty("errorMessage");
    });
  });
});
