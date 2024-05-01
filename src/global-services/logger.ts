import { LOG_LEVEL } from "../config";
import { LOG_REQUEST_ID_LENGTH } from "../consts";
import { format } from "date-fns";
import winston from "winston";

export const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp()),
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(formatters)
      )
    })
  ]
});

/**
 * Custom log formatter
 * @param info - Log info
 * @returns - Formatted log string
 */
function formatters(info: winston.Logform.TransformableInfo): string {
  const { level, message, requestId, stack, timestamp } = info;

  const messageStr = stack ?? message;

  const timestampStr = format(timestamp, "EEE, MMM d, HH:mm:ss.SSS");

  if (requestId) {
    const requestIdStr = requestId.slice(0, LOG_REQUEST_ID_LENGTH);

    return `${level} at req '${requestIdStr}' on ${timestampStr}: ${messageStr}`;
  }

  return `${level} on ${timestampStr}: ${messageStr}`;
}
