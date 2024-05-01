import { LOG_LEVEL } from "../config";
import { LOG_REQUEST_ID_LENGTH } from "../consts";
import { format } from "date-fns";
import { ucfirst } from "../utils";
import winston from "winston";

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp()
  ),
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.printf(formatters))
    })
  ]
});

/**
 * Custom log formatter
 * @param info - Log info
 * @returns - Formatted log string
 */
function formatters(info: winston.Logform.TransformableInfo): string {
  const level = ucfirst(info.level);

  const message = String(info["stack"] ?? info.message);

  const timestamp = format(info["timestamp"], "EEE, MMM d, HH:mm:ss.SSS");

  if (info["requestId"]) {
    const requestId = String(info["requestId"]).slice(0, LOG_REQUEST_ID_LENGTH);

    return `${level} at req '${requestId}' on ${timestamp}: ${message}`;
  }

  return `${level} on ${timestamp}: ${message}`;
}
