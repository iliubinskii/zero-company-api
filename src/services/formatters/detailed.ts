import { LOG_REQUEST_ID_LENGTH } from "../../consts";
import { format } from "date-fns";
import { ucfirst } from "../../utils";
import type winston from "winston";

/**
 * Custom log formatter.
 * @param info - Log info.
 * @returns - Formatted log string.
 */
export function detailedFormatter(
  info: winston.Logform.TransformableInfo
): string {
  const level = ucfirst(info.level);

  const message = String(info.message);

  const requestId =
    typeof info["requestId"] === "string"
      ? ` ('${info["requestId"].slice(0, LOG_REQUEST_ID_LENGTH)}')`
      : "";

  const stack = typeof info["stack"] === "string" ? `\n${info["stack"]}` : "";

  const timestamp =
    typeof info["timestamp"] === "string"
      ? format(info["timestamp"], " 'on' EEE, MMM d, 'at' HH:mm:ss.SSS")
      : "";

  return `${level}${timestamp}${requestId}: ${message}${stack}`;
}
