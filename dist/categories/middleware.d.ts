import { NextFunction, Request, Response } from "express";
/**
 * Middleware to require a valid category object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export declare function requireValidCategory(req: Request, res: Response, next: NextFunction): void;
/**
 * Middleware to require a valid category update object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export declare function requireValidCategoryUpdate(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=middleware.d.ts.map