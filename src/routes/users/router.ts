import { requireIdParam, requireJwt, requireJwtAdmin } from "../../middleware";
import { Router } from "express";
import type { UserControllers } from "../../types";
import { usersMiddleware } from "./middleware";

/**
 * Creates a router for user routes.
 * @param controllers - The controllers for the user routes.
 * @returns A router for user routes.
 */
export function createUsersRouter(controllers: UserControllers): Router {
  const { userRefFromIdParam } = usersMiddleware;

  return Router()
    .get("/", requireJwt, controllers.getUsers)
    .post("/", requireJwt, controllers.addUser)
    .get(
      "/:id",
      requireJwt,
      requireIdParam,
      userRefFromIdParam,
      controllers.getUser
    )
    .put(
      "/:id",
      requireJwtAdmin,
      requireIdParam,
      userRefFromIdParam,
      controllers.updateUser
    )
    .delete(
      "/:id",
      requireJwtAdmin,
      requireIdParam,
      userRefFromIdParam,
      controllers.deleteUser
    )
    .get(
      "/:id/companies",
      requireJwtAdmin,
      requireIdParam,
      userRefFromIdParam,
      controllers.getCompaniesByUser
    )
    .get(
      "/:id/documents",
      requireJwtAdmin,
      requireIdParam,
      userRefFromIdParam,
      controllers.getDocumentsByUser
    )
    .get(
      "/:id/favorite-companies",
      requireJwtAdmin,
      requireIdParam,
      userRefFromIdParam,
      controllers.getFavoriteCompaniesByUser
    );
}
