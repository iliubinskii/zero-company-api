import type winston from "winston";

/**
 * Custom log formatter
 * @param info - Log info
 * @returns - Formatted log string
 */
export function simpleFormatter(
  info: winston.Logform.TransformableInfo
): string {
  const message = String(info.message);

  const stack = typeof info["stack"] === "string" ? `\n${info["stack"]}` : "";

  return `${message}${stack}`;
}
