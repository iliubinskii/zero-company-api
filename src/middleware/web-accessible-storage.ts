import { assertDefined, wrapAsyncHandler } from "../utils";
import type { RequestHandler } from "express";
import type { WebAccessibleImage } from "../schema";
import fs from "node:fs/promises";
import { uploadImage } from "../providers";

/**
 * Creates a middleware that uploads files to a web-accessible storage.
 * @param fields - The fields to upload.
 * @returns The middleware.
 */
export function webAccessibleStorage(fields: Fields): RequestHandler {
  return wrapAsyncHandler(async (req, _res, next) => {
    if (req.files)
      if (Array.isArray(req.files)) {
        // Ignore `req.files` if it's an array
      } else {
        const uploads = await Promise.all(
          Object.entries(req.files).map(async ([fieldName, files]) => {
            const responses = await Promise.all(
              files.map(async file => {
                const response = await uploadImage(file.path, fieldName);

                // eslint-disable-next-line security/detect-non-literal-fs-filename -- Ok
                await fs.unlink(file.path);

                return response;
              })
            );

            return {
              fieldName,
              responses: responses.map(
                ({
                  asset_id,
                  height,
                  secure_url,
                  url,
                  width
                }): WebAccessibleImage => {
                  return {
                    assetId: String(asset_id),
                    height,
                    secureUrl: secure_url,
                    url,
                    width
                  };
                }
              ),
              type: assertDefined(fields[fieldName])
            };
          })
        );

        for (const { fieldName, responses, type } of uploads)
          switch (type) {
            case FieldType.single: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
              req.body[fieldName] = assertDefined(responses[0]);

              break;
            }

            case FieldType.multiple: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
              req.body[fieldName] = responses;
            }
          }
      }

    next();
  });
}

export enum FieldType {
  multiple = "multiple",
  single = "single"
}

export interface Fields {
  [fieldName: string]: FieldType;
}
