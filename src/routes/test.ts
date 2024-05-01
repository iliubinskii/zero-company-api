import { TEST_DELAY_MS } from "../consts";
import { delay } from "../utils";
import express from "express";

export const testRouter = express.Router();

testRouter
  .get("/async-reject", async (_req, _res, next) => {
    try {
      await delay(TEST_DELAY_MS);
      throw new Error("Async error!");
    } catch (err) {
      next(err);
    }
  })
  .get("/sync-reject", () => {
    throw new Error("Sync error!");
  });
