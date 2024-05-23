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
  const { userEmailFromParam } = usersMiddleware;

  const router = Router();

  router
    .get("/", requireJwt, controllers.getUsers)
    .get("/:email", requireJwt, userEmailFromParam, controllers.getUser)
    .post("/:email", requireJwtAdmin, userEmailFromParam, controllers.addUser)
    .put("/:email", requireJwtAdmin, userEmailFromParam, controllers.updateUser)
    .delete(
      "/:email",
      requireJwtAdmin,
      userEmailFromParam,
      controllers.deleteUser
    )
    .get(
      "/:email/companies",
      requireJwt,
      userEmailFromParam,
      controllers.getCompaniesByUser
    );

  return router;
}
