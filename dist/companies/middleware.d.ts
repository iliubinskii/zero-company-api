import { NextFunction, Request, Response } from "express";
/**
 * Middleware to require a valid company object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export declare function requireValidCompany(req: Request, res: Response, next: NextFunction): void;
/**
 * Middleware to require a valid company update object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export declare function requireValidCompanyUpdate(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=middleware.d.ts.map