import { requireJwtAdmin, requireJwtUser } from "../../middleware";
import { Router } from "express";
import { UserControllers } from "../../types";
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
    requireValidUserCreate,
    requireValidUserUpdate,
    userEmailFromParams
  } = usersMiddleware;

  const router = Router();

  router
    .get("/", requireJwtUser, requireValidGetUsersOptions, controllers.getUsers)
    .get("/:email", requireJwtUser, userEmailFromParams, controllers.getUser)
    .post(
      "/:email",
      requireJwtAdmin,
      requireValidUserCreate,
      userEmailFromParams,
      controllers.addUser
    )
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
