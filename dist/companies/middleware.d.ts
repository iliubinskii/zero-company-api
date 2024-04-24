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
export declare const uploadHandler: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const webAccessibleStorage: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=middleware.d.ts.map