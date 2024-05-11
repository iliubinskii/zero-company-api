import { Router } from "express";
import { UserControllers } from "../../types";
import { requireJwtUser } from "../../middleware";
import { usersMiddleware } from "./middleware";

/**
 * Creates a router for me routes.
 * @param controllers - The controllers for the me routes.
 * @returns A router for me routes.
 */
export function createMeRouter(controllers: UserControllers): Router {
  const {
    requireValidGetCompaniesByUserOptions,
    requireValidUserCreate,
    requireValidUserUpdate,
    userEmailFromJwtUser
  } = usersMiddleware;

  const router = Router();

  router
    .get("/", requireJwtUser, userEmailFromJwtUser, controllers.getUser)
    .post(
      "/",
      requireJwtUser,
      requireValidUserCreate,
      userEmailFromJwtUser,
      controllers.addUser
    )
    .put(
      "/",
      requireJwtUser,
      requireValidUserUpdate,
      userEmailFromJwtUser,
      controllers.updateUser
    )
    .delete("/", requireJwtUser, userEmailFromJwtUser, controllers.deleteUser)
    .get(
      "/companies",
      requireJwtUser,
      userEmailFromJwtUser,
      requireValidGetCompaniesByUserOptions,
      controllers.getCompaniesByUser
    );

  return router;
}
