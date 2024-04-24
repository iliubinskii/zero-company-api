/**
 * Create a middleware to handle uploaded files
 * @param fileFields - The fields to handle
 * @returns The middleware
 */
export declare function createUploadHandler(fileFields: FileFields): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
interface FileFields {
    readonly [fieldName: string]: number;
}
export {};
//# sourceMappingURL=upload-handler.d.ts.map