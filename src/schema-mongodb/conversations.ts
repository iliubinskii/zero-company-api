import mongoose from "mongoose";

export const ConversationSchema = new mongoose.Schema(
  {
    // eslint-disable-next-line no-warning-comments -- Assigned
    // TODO: Added to avoid error for empty schema, decide to keep or not
    type: {
      required: true,
      type: mongoose.Schema.Types.String
    }
    // eslint-disable-next-line no-warning-comments -- Assigned
    // TODO: Add the schema for the conversation
  },
  { versionKey: false }
);

/**
 * Creates a conversation model.
 * @param connection - The mongoose connection.
 * @returns A conversation model.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export function getConversationModel(connection: typeof mongoose) {
  return connection.model("Conversation", ConversationSchema);
}

export type ConversationModel = ReturnType<typeof getConversationModel>;
