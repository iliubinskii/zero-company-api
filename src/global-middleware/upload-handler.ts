import { MULTER_DESTINATION_PATH } from "../config";
import multer from "multer";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(
      // eslint-disable-next-line unicorn/no-null -- Ok
      null,
      MULTER_DESTINATION_PATH
    );
  },
  filename(_req, file, callback) {
    callback(
      // eslint-disable-next-line unicorn/no-null -- Ok
      null,
      uuidv4() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });

/**
 * Create a middleware to handle uploaded files
 * @param fileFields - The fields to handle
 * @returns The middleware
 */
export function createUploadHandler(fileFields: readonly multer.Field[]) {
  return upload.fields(fileFields);
}
