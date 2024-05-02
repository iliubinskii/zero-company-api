import { createLogger } from "./logger";
import { simpleFormatter } from "./formatters";

export const logger = createLogger(simpleFormatter);
