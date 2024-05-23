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
  const { userEmailFromJwt } = usersMiddleware;

  const router = Router();

  router
    .get("/", requireJwt, userEmailFromJwt, controllers.getUser)
    .post("/", requireJwt, userEmailFromJwt, controllers.addUser)
    .put("/", requireJwt, userEmailFromJwt, controllers.updateUser)
    .delete("/", requireJwt, userEmailFromJwt, controllers.deleteUser)
    .get(
      "/companies",
      requireJwt,
      userEmailFromJwt,
      controllers.getCompaniesByUser
    );

  return router;
}
