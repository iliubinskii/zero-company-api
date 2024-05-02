import { LOG_LEVEL } from "../config";
import winston from "winston";

/**
 * Create logger
 * @param formatter - Formatter
 * @returns - Logger
 */
export function createLogger(formatter: Formatter): winston.Logger {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp()
    ),
    level: LOG_LEVEL,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.printf(formatter))
      })
    ]
  });
}

export interface Formatter {
  (info: winston.Logform.TransformableInfo): string;
}
