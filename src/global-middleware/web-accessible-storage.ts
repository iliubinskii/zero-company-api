import { NextFunction, Request, Response } from "express";
import fs from "node:fs/promises";
import { strings } from "../types";
import { uploadImage } from "../providers";

/**
 * A middleware that uploads files to a web-accessible storage.
 * @param req - The request object.
 * @param _res - The response object.
 * @param next - The next function.
 */
export async function webAccessibleStorage(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  if (req.files && !Array.isArray(req.files)) {
    const entries = await Promise.all(
      Object.entries(req.files).map(
        async ([fieldName, files]): Promise<[string, strings]> => {
          const urls = await Promise.all(
            files.map(async file => {
              const result = await uploadImage(file.path, fieldName);

              // eslint-disable-next-line security/detect-non-literal-fs-filename -- Ok
              await fs.unlink(file.path);

              return result.secure_url;
            })
          );

          return [fieldName, urls];
        }
      )
    );

    req.customUploads = Object.fromEntries(entries);
  }

  next();
}
