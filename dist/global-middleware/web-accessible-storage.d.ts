import { NextFunction, Request, Response } from "express";
/**
 * Creates a middleware that uploads files to a web-accessible storage.
 * @param fields - The fields to upload.
 * @returns The middleware.
 */
export declare function createWebAccessibleStorage(fields: Fields): (req: Request, _res: Response, next: NextFunction) => Promise<void>;
export declare enum FieldType {
    multiple = "multiple",
    single = "single"
}
export interface Fields {
    [fieldName: string]: FieldType;
}
//# sourceMappingURL=web-accessible-storage.d.ts.map