import { delay, wrapAsyncHandler } from "../utils";
import { FoundingAgreement } from "../templates";
import { Router } from "express";
import { TEST_DELAY_MS } from "../consts";
import { createDigitalDocument } from "../providers";
import { faker } from "@faker-js/faker";
import { lang } from "../langs";

export const testRouter = Router()
  .use(
    "/founding-agreement",
    Router()
      .get("/parse-template", (_req, res) => {
        const doc = FoundingAgreement([
          { email: faker.internet.email(), role: `${lang.Founder} 1` },
          { email: faker.internet.email(), role: `${lang.Founder} 2` },
          { email: faker.internet.email(), role: `${lang.Founder} 3` }
        ]);

        res.send(doc);
      })
      .get(
        "/create-digital-document",
        wrapAsyncHandler(async (_req, res) => {
          const doc = await createDigitalDocument(
            lang.FoundingAgreement,
            FoundingAgreement,
            [
              { email: faker.internet.email(), role: `${lang.Founder} 1` },
              { email: faker.internet.email(), role: `${lang.Founder} 2` },
              { email: faker.internet.email(), role: `${lang.Founder} 3` }
            ]
          );

          res.json(doc);
        })
      )
  )
  .use(
    "/reject",
    Router()
      .get(
        "/async",
        wrapAsyncHandler(async () => {
          await delay(TEST_DELAY_MS);
          throw new Error(lang.AsyncError);
        })
      )
      .get("/sync", () => {
        throw new Error(lang.SyncError);
      })
  );
