import { delay, wrapAsyncHandler } from "../utils";
import { TEST_DELAY_MS } from "../consts";
import express from "express";

export const testRouter = express.Router();

testRouter
  .get(
    "/async-reject",
    wrapAsyncHandler(async () => {
      await delay(TEST_DELAY_MS);
      throw new Error("Async error!");
    })
  )
  .get("/sync-reject", () => {
    throw new Error("Sync error!");
  });
