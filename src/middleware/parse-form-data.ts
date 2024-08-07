import { MULTER_DESTINATION_PATH } from "../config";
import type { RequestHandler } from "express";
import multer from "multer";
import path from "node:path";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, MULTER_DESTINATION_PATH);
  },
  filename: (_req, file, callback) => {
    const basename = uuid();

    const ext = path.extname(file.originalname);

    callback(null, `${basename}${ext}`);
  }
});

const upload = multer({ storage });

/**
 * Create a middleware to handle uploaded files.
 * @param fileFields - The fields to handle.
 * @returns The middleware.
 */
export function parseFormData(fileFields: FileFields): RequestHandler {
  return upload.fields(
    Object.entries(fileFields).map(([name, maxCount]) => {
      return { maxCount, name };
    })
  );
}

interface FileFields {
  readonly [fieldName: string]: number;
}
