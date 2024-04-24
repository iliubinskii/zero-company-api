import multer from "multer";
/**
 * Create a middleware to handle uploaded files
 * @param fileFields - The fields to handle
 * @returns The middleware
 */
export declare function createUploadHandler(fileFields: readonly multer.Field[]): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
//# sourceMappingURL=upload-handler.d.ts.map