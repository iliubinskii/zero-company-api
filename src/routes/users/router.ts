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
  const { userEmailFromParam } = usersMiddleware;

  const router = Router();

  router
    .get("/", requireJwtUser, controllers.getUsers)
    .get("/:email", requireJwtUser, userEmailFromParam, controllers.getUser)
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
      requireJwtUser,
      userEmailFromParam,
      controllers.getCompaniesByUser
    );

  return router;
}
