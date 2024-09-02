import type {
  ConversationCreate,
  ConversationUpdate,
  ExistingConversation
} from "./conversations";
import { IdValidationSchema } from "./common";
import zod from "zod";

export const ExistingConversationValidationSchema = zod.object({
  _id: IdValidationSchema
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Add validators
});

export const ConversationCreateValidationSchema =
  ExistingConversationValidationSchema;

export const ConversationUpdateValidationSchema =
  ExistingConversationValidationSchema.partial();

// Type check the existing conversation validation schema
((): ExistingConversation | undefined => {
  const result = ExistingConversationValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the conversation create validation schema
((): ConversationCreate | undefined => {
  const result = ConversationCreateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the conversation update validation schema
((): ConversationUpdate | undefined => {
  const result = ConversationUpdateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
