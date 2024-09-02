import type { Conversation } from "../../schema";
import type { ConversationsService } from "../../types";
import type { FilterQuery } from "mongoose";
import { MAX_LIMIT } from "../../schema";
import { MONGODB_RUN_VALIDATORS } from "../../config";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { getModels } from "../../schema-mongodb";

/**
 * Creates a MongoDB service for conversations.
 * @returns A MongoDB service for conversations.
 */
export function createConversationsService(): ConversationsService {
  return {
    addConversation: async data => {
      const { ConversationModel } = await getModels();

      const conversation = new ConversationModel(data);

      await conversation.save();

      return conversation;
    },
    deleteConversation: async id => {
      const { ConversationModel } = await getModels();

      const conversation = await ConversationModel.findByIdAndDelete(id);

      return conversation ? 1 : 0;
    },
    getConversation: async id => {
      const { ConversationModel } = await getModels();

      return ConversationModel.findById(id);
    },
    getConversations: async ({ limit = MAX_LIMIT, offset = 0 } = {}) => {
      const filter: Writable<FilterQuery<Conversation>> = {};

      const { ConversationModel } = await getModels();

      const [conversations, total] = await Promise.all([
        ConversationModel.find(filter).skip(offset).limit(limit),
        ConversationModel.countDocuments(filter)
      ]);

      return {
        count: conversations.length,
        docs: conversations,
        total
      };
    },
    updateConversation: async (id, conversation) => {
      const { ConversationModel } = await getModels();

      return ConversationModel.findByIdAndUpdate(id, conversation, {
        new: true,
        runValidators: MONGODB_RUN_VALIDATORS
      });
    }
  };
}
