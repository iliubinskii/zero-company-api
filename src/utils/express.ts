import { ErrorCode } from "../schema";
import { filterUndefinedProperties } from "./objects";
import { lang } from "../langs";

/**
 * Builds an error response object.
 * @param error - The error code.
 * @param data - Additional data to include in the response.
 * @returns The error response object.
 */
export function buildErrorResponse(error: ErrorCode, data?: unknown): object {
  return filterUndefinedProperties({
    data,
    error,
    // eslint-disable-next-line security/detect-object-injection -- Ok
    errorMessage: lang[error]
  });
}
