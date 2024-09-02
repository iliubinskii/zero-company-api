import type { MultipleDocsResponse, Update } from "./common";

// eslint-disable-next-line misc/typescript/no-empty-interfaces -- Temp
export interface Conversation {
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Add properties
}

export interface ConversationCreate extends Conversation {}

export interface ConversationUpdate extends Update<Conversation> {}

export interface ExistingConversation extends Conversation {
  readonly _id: string;
}

export type ExistingConversations = MultipleDocsResponse<ExistingConversation>;
