import { RequestHandler } from "express";
import { mongodbConnection } from "../providers";
import { wrapAsyncHandler } from "../utils";

export const waitForMongodbConnection: RequestHandler = wrapAsyncHandler(
  async (_req, _res, next) => {
    await mongodbConnection;
    next();
  }
);
