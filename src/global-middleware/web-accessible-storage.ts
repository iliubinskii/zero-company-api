import { RequestHandler } from "express";
import { assertDefined } from "../utils";
import fs from "node:fs/promises";
import { uploadImage } from "../providers";

/**
 * Creates a middleware that uploads files to a web-accessible storage.
 * @param fields - The fields to upload.
 * @returns The middleware.
 */
export function createWebAccessibleStorage(fields: Fields): RequestHandler {
  return async (req, _res, next) => {
    if (req.files && !Array.isArray(req.files)) {
      const uploads = await Promise.all(
        Object.entries(req.files).map(async ([fieldName, files]) => {
          const urls = await Promise.all(
            files.map(async file => {
              const result = await uploadImage(file.path, fieldName);

              // eslint-disable-next-line security/detect-non-literal-fs-filename -- Ok
              await fs.unlink(file.path);

              return result.secure_url;
            })
          );

          return {
            fieldName,
            // eslint-disable-next-line security/detect-object-injection -- Ok
            type: assertDefined(fields[fieldName]),
            urls
          };
        })
      );

      for (const { fieldName, type, urls } of uploads)
        switch (type) {
          case FieldType.single: {
            // eslint-disable-next-line security/detect-object-injection -- Ok
            req.body[fieldName] = assertDefined(urls[0]);

            break;
          }

          case FieldType.multiple: {
            // eslint-disable-next-line security/detect-object-injection -- Ok
            req.body[fieldName] = urls;
          }
        }

      next();
    }
  };
}

export enum FieldType {
  multiple = "multiple",
  single = "single"
}

export interface Fields {
  [fieldName: string]: FieldType;
}
