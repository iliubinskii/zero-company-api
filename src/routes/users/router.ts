import { requireJwt, requireJwtAdmin } from "../../middleware";
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

  const router = Router();

  router
    .get("/", requireJwt, controllers.getUsers)
    .get("/:email", requireJwt, userRefFromIdParam, controllers.getUser)
    .post("/:email", requireJwtAdmin, userRefFromIdParam, controllers.addUser)
    .put("/:email", requireJwtAdmin, userRefFromIdParam, controllers.updateUser)
    .delete(
      "/:email",
      requireJwtAdmin,
      userRefFromIdParam,
      controllers.deleteUser
    )
    .get(
      "/:email/companies",
      requireJwt,
      userRefFromIdParam,
      controllers.getCompaniesByUser
    );

  return router;
}
