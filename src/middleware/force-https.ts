/* eslint-disable eslint-comments/no-unlimited-disable -- Temp */
/* eslint-disable -- Temp */
// @ts-nocheck

import { RequestHandler } from "express";

export const forceHttps: RequestHandler = (req, res, next) => {
  // TODO:
  // If HTTP -> next()
  // Otherwise respond with appropriate status code
};
