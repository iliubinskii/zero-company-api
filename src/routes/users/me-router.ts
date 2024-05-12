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
  const { userEmailFromJwtUser } = usersMiddleware;

  const router = Router();

  router
    .get("/", requireJwtUser, userEmailFromJwtUser, controllers.getUser)
    .post("/", requireJwtUser, userEmailFromJwtUser, controllers.addUser)
    .put("/", requireJwtUser, userEmailFromJwtUser, controllers.updateUser)
    .delete("/", requireJwtUser, userEmailFromJwtUser, controllers.deleteUser)
    .get(
      "/companies",
      requireJwtUser,
      userEmailFromJwtUser,
      controllers.getCompaniesByUser
    );

  return router;
}
