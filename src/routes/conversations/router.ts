import { requireIdParam, requireJwtAdmin } from "../../middleware";
import type { ConversationControllers } from "../../types";
import { Router } from "express";

/**
 * Creates a router for conversation routes.
 * @param controllers - The controllers for the conversation routes.
 * @returns A router for conversation routes.
 */
export function createConversationsRouter(
  controllers: ConversationControllers
): Router {
  return Router()
    .get("/", controllers.getConversations)
    .post("/", requireJwtAdmin, controllers.addConversation)
    .get("/:id", requireIdParam, controllers.getConversation)
    .put(
      "/:id",
      requireJwtAdmin,
      requireIdParam,
      controllers.updateConversation
    )
    .delete(
      "/:id",
      requireJwtAdmin,
      requireIdParam,
      controllers.deleteConversation
    );
}
