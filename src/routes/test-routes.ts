import { delay, wrapAsyncHandler } from "../utils";
import { Router } from "express";
import { TEST_DELAY_MS } from "../consts";

export const testRouter = Router();

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
