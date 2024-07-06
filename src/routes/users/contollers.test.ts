import type {
  CompaniesService,
  DocumentsService,
  UserRef,
  UsersService
} from "../../types";
import { CompanyStatus, ErrorCode } from "../../schema";
import { describe, expect, it, jest } from "@jest/globals";
import type { Jwt } from "../../schema";
import { StatusCodes } from "http-status-codes";
import { createUserControllers } from "./controllers";
import express from "express";
import { faker } from "@faker-js/faker";
import { jsonTransform } from "../../utils";
import mongoose from "mongoose";
import request from "supertest";

describe("createUserControllers", () => {
  const jwt: Jwt = { email: faker.internet.email() };

  const userRef: UserRef = {
    id: faker.database.mongodbObjectId(),
    type: "id"
  };

  const mockUsersService = {
    addUser: jest.fn<UsersService["addUser"]>(),
    deleteUser: jest.fn<UsersService["deleteUser"]>(),
    getUser: jest.fn<UsersService["getUser"]>(),
    getUsers: jest.fn<UsersService["getUsers"]>(),
    updateUser: jest.fn<UsersService["updateUser"]>()
  } as const;

  const mockCompaniesService = {
    addCompany: jest.fn<CompaniesService["addCompany"]>(),
    deleteCompany: jest.fn<CompaniesService["deleteCompany"]>(),
    generateFoundingAgreement:
      jest.fn<CompaniesService["generateFoundingAgreement"]>(),
    getCompanies: jest.fn<CompaniesService["getCompanies"]>(),
    getCompany: jest.fn<CompaniesService["getCompany"]>(),
    updateCompany: jest.fn<CompaniesService["updateCompany"]>()
  } as const;

  const mockDocumentsService = {
    addDocument: jest.fn<DocumentsService["addDocument"]>(),
    deleteDocument: jest.fn<DocumentsService["deleteDocument"]>(),
    getDocument: jest.fn<DocumentsService["getDocument"]>(),
    getDocuments: jest.fn<DocumentsService["getDocuments"]>(),
    updateDocument: jest.fn<DocumentsService["updateDocument"]>()
  } as const;

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
      const data = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      } as const;

      const user = {
        _id: new mongoose.Types.ObjectId(),
        email: jwt.email,
        favoriteCompanies: [],
        ...data
      } as const;

      mockUsersService.addUser.mockResolvedValueOnce(user);

      const response = await request(app).post("/users").send(data);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual(jsonTransform(user));
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(app).post("/users").send({ firstName: 1 });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty("error", ErrorCode.InvalidData);
      expect(response.body).toHaveProperty("errorMessage");
    });

    it("should return 409 if user already exists", async () => {
      const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      } as const;

      mockUsersService.addUser.mockResolvedValueOnce(null);

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
          {
            _id: new mongoose.Types.ObjectId(),
            categories: [],
            country: "us",
            createdAt: faker.date.past(),
            founders: [],
            images: [],
            name: faker.company.name(),
            status: CompanyStatus.founded
          }
        ],
        total: 1
      } as const;

      mockCompaniesService.getCompanies.mockResolvedValueOnce(companies);

      const response = await request(app).get(
        `/users/${faker.database.mongodbObjectId()}/companies`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(jsonTransform(companies));
    });

    it("should return 400 for invalid query", async () => {
      const response = await request(app)
        .get(`/users/${faker.database.mongodbObjectId()}/companies`)
        .query({ limit: "x" });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty("error", ErrorCode.InvalidQuery);
      expect(response.body).toHaveProperty("errorMessage");
    });
  });

  describe("getUser", () => {
    it("should get a user and return 200", async () => {
      const user = {
        _id: new mongoose.Types.ObjectId(),
        email: faker.internet.email(),
        favoriteCompanies: [],
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      } as const;

      mockUsersService.getUser.mockResolvedValueOnce(user);

      const response = await request(app).get(
        `/users/${faker.database.mongodbObjectId()}`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(jsonTransform(user));
    });

    it("should return 404 if user was not found", async () => {
      mockUsersService.getUser.mockResolvedValueOnce(null);

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
            _id: new mongoose.Types.ObjectId(),
            email: faker.internet.email(),
            favoriteCompanies: [],
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
          }
        ],
        total: 1
      } as const;

      mockUsersService.getUsers.mockResolvedValueOnce(users);

      const response = await request(app).get("/users");

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(jsonTransform(users));
    });

    it("should return 400 for invalid query", async () => {
      const response = await request(app).get("/users").query({ limit: "x" });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty("error", ErrorCode.InvalidQuery);
      expect(response.body).toHaveProperty("errorMessage");
    });
  });

  describe("updateUser", () => {
    it("should update a user and return 200", async () => {
      const user = {
        _id: new mongoose.Types.ObjectId(),
        email: faker.internet.email(),
        favoriteCompanies: [],
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      } as const;

      mockUsersService.updateUser.mockResolvedValueOnce(user);

      const response = await request(app)
        .put(`/users/${faker.database.mongodbObjectId()}`)
        .send(user);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(jsonTransform(user));
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(app)
        .put(`/users/${faker.database.mongodbObjectId()}`)
        .send({ firstName: 1 });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty("error", ErrorCode.InvalidData);
      expect(response.body).toHaveProperty("errorMessage");
    });

    it("should return 404 if user was not found", async () => {
      mockUsersService.updateUser.mockResolvedValueOnce(null);

      const response = await request(app).put(
        `/users/${faker.database.mongodbObjectId()}`
      );

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toHaveProperty("error", ErrorCode.NotFound);
      expect(response.body).toHaveProperty("errorMessage");
    });
  });
});
