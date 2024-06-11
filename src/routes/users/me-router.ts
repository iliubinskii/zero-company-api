import { Router } from "express";
import type { UserControllers } from "../../types";
import { requireJwt } from "../../middleware";
import { usersMiddleware } from "./middleware";

/**
 * Creates a router for me routes.
 * @param controllers - The controllers for the me routes.
 * @returns A router for me routes.
 */
export function createMeRouter(controllers: UserControllers): Router {
  const { userRefFromJwt } = usersMiddleware;

  const router = Router();

  router
    .get("/", requireJwt, userRefFromJwt, controllers.getUser)
    .post("/", requireJwt, userRefFromJwt, controllers.addUser)
    .put("/", requireJwt, userRefFromJwt, controllers.updateUser)
    .delete("/", requireJwt, userRefFromJwt, controllers.deleteUser)
    .get(
      "/companies",
      requireJwt,
      userRefFromJwt,
      controllers.getCompaniesByUser
    )
    .get(
      "/favorite-companies",
      requireJwt,
      userRefFromJwt,
      controllers.getFavoriteCompaniesByUser
    );

  return router;
}
