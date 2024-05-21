import type { RequestHandler } from "express";
import { lang } from "../langs";
import { logger } from "../services";

export const logResponse: RequestHandler = (req, res, next) => {
  const t1 = Date.now();

  res.on("finish", () => {
    const t2 = Date.now();

    const durationMs = Math.round(t2 - t1);

    logger.info(
      `${res.statusCode} ${res.statusMessage} ${lang.in} ${durationMs}${lang.ms}`,
      { requestId: req.requestId }
    );
  });
  next();
};
