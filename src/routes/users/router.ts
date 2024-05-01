import { requireJwtAdmin, requireJwtUser } from "../../middleware";
import { UserControllers } from "../../types";
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
    requireValidUserUpdate,
    userEmailFromParams
  } = usersMiddleware;

  const router = express.Router();

  router
    .get("/", requireJwtUser, requireValidGetUsersOptions, controllers.getUsers)
    .post("/", requireJwtAdmin, requireValidUser, controllers.addUser)
    .get("/:email", requireJwtUser, userEmailFromParams, controllers.getUser)
    .put(
      "/:email",
      requireJwtAdmin,
      requireValidUserUpdate,
      userEmailFromParams,
      controllers.updateUser
    )
    .delete(
      "/:email",
      requireJwtAdmin,
      userEmailFromParams,
      controllers.deleteUser
    )
    .get(
      "/:email/companies",
      requireJwtUser,
      requireValidGetCompaniesByUserOptions,
      userEmailFromParams,
      controllers.getCompaniesByUser
    );

  return router;
}
