import { requireJwtAdmin, requireJwtUser } from "../global-middleware";
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
    .get("/", requireJwtUser, requireValidGetUsersOptions, controllers.getUsers)
    .post("/", requireJwtAdmin, requireValidUser, controllers.addUser)
    .get("/:email", requireJwtUser, controllers.getUser)
    .put(
      "/:email",
      requireJwtAdmin,
      requireValidUserUpdate,
      controllers.updateUser
    )
    .delete("/:email", requireJwtAdmin, controllers.deleteUser)
    .get(
      "/:email/companies",
      requireJwtUser,
      requireValidGetCompaniesByUserOptions,
      controllers.getCompaniesByUser
    );

  return router;
}
