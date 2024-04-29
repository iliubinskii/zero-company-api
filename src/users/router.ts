import { UserControllers } from "../types";
import express, { Router } from "express";
import { usersMiddleware } from "./middleware";

/**
 * Creates a router for user routes.
 * @param controllers - The controllers for the user routes.
 * @returns A router for user routes.
 */
export function createUsersRouter(controllers: UserControllers): Router {
  const {
    requireValidGetCompaniesByUserOptions,
    requireValidGetUsersOptions,
    requireValidUser,
    requireValidUserUpdate
  } = usersMiddleware;

  const router = express.Router();

  router
    .get("/", requireValidGetUsersOptions, controllers.getUsers)
    .post("/", requireValidUser, controllers.addUser)
    .get("/:email", controllers.getUser)
    .put("/:email", requireValidUserUpdate, controllers.updateUser)
    .delete("/:email", controllers.deleteUser)
    .get(
      "/:email/companies",
      requireValidGetCompaniesByUserOptions,
      controllers.getCompaniesByUser
    );

  return router;
}
