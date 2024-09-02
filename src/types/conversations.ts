import type {
  Conversation,
  ConversationUpdate,
  ExistingConversation,
  GetConversationsOptions,
  MultipleDocsResponse
} from "../schema";
import type { RequestHandler } from "express";
import type mongoose from "mongoose";

export interface ConversationControllers {
  readonly addConversation: RequestHandler;
  readonly deleteConversation: RequestHandler;
  readonly getConversation: RequestHandler;
  readonly getConversations: RequestHandler;
  readonly updateConversation: RequestHandler;
}

export interface ConversationsMiddleware {
  readonly parseFormData: RequestHandler;
  readonly webAccessibleStorage: RequestHandler;
}

export interface ConversationsService {
  /**
   * Adds a conversation to the database.
   * @param conversation - The conversation to add.
   * @returns A promise that resolves when the conversation has been added.
   */
  readonly addConversation: (
    conversation: Conversation
  ) => Promise<RawExistingConversation>;
  /**
   * Deletes a conversation from the database.
   * @param id - The ID of the conversation to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteConversation: (id: string) => Promise<number>;
  /**
   * Gets a conversation from the database.
   * @param id - The ID of the conversation to get.
   * @returns A promise that resolves with the conversation, or `null` if the conversation was not found.
   */
  readonly getConversation: (
    id: string
  ) => Promise<RawExistingConversation | null>;
  /**
   * Gets all conversations from the database.
   * @param options - The options to use when getting conversations.
   * @returns A promise that resolves with all conversations in the database.
   */
  readonly getConversations: (
    options?: GetConversationsOptions
  ) => Promise<RawExistingConversations>;
  /**
   * Updates a conversation in the database.
   * @param id - The ID of the conversation to update.
   * @param conversation - The conversation data to update.
   * @returns A promise that resolves with the updated conversation, or `null` if the conversation was not found.
   */
  readonly updateConversation: (
    id: string,
    conversation: ConversationUpdate
  ) => Promise<RawExistingConversation | null>;
}

export interface RawExistingConversation
  extends Omit<ExistingConversation, "_id"> {
  readonly _id: mongoose.Types.ObjectId;
}

export type RawExistingConversations =
  MultipleDocsResponse<RawExistingConversation>;
