import { UserControllers } from "../types";
import express, { Router } from "express";
import { requireJwtUser } from "../global-middleware";
import { usersMiddleware } from "./middleware";

/**
 * Creates a router for me routes.
 * @param controllers - The controllers for the me routes.
 * @returns A router for me routes.
 */
export function createMeRouter(controllers: UserControllers): Router {
  const {
    requireValidGetCompaniesByUserOptions,
    requireValidMeUser,
    requireValidUser,
    requireValidUserUpdate,
    userEmailFromJwtUser
  } = usersMiddleware;

  const router = express.Router();

  router
    .get("/", requireJwtUser, userEmailFromJwtUser, controllers.getUser)
    .post(
      "/",
      requireJwtUser,
      userEmailFromJwtUser,
      requireValidUser,
      requireValidMeUser,
      controllers.addUser
    )
    .put(
      "/",
      requireJwtUser,
      userEmailFromJwtUser,
      requireValidUserUpdate,
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
