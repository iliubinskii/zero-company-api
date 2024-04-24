import { Companies, Company } from "../schema";
import { NextFunction, Request, Response } from "express";

export interface CompaniesService {
  /**
   * Adds a company to the database.
   * @param company - The company to add.
   * @returns A promise that resolves when the company has been added.
   */
  readonly addCompany: (company: Company) => Promise<Company | undefined>;
  /**
   * Deletes a company from the database.
   * @param id - The ID of the company to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteCompany: (id: string) => Promise<number>;
  /**
   * Gets all companies from the database.
   * @returns A promise that resolves with all companies in the database.
   */
  readonly getCompanies: () => Promise<Companies>;
  /**
   * Gets a company from the database.
   * @param id - The ID of the company to get.
   * @returns A promise that resolves with the company, or `undefined` if the company was not found.
   */
  readonly getCompany: (id: string) => Promise<Company | undefined>;
  /**
   * Updates a company in the database.
   * @param id - The ID of the company to update.
   * @param company - The company data to update.
   * @returns A promise that resolves with the updated company, or `undefined` if the company was not found.
   */
  readonly updateCompany: (
    id: string,
    company: Company
  ) => Promise<Company | undefined>;
}

export interface CompanyControllers {
  /**
   * Adds a company to the database.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  addCompany: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  /**
   * Deletes a company from the database.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  deleteCompany: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  /**
   * Returns all companies from the database.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  getCompanies: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  /**
   * Returns a company from the database.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  getCompany: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  /**
   * Updates a company in the database.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  updateCompany: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}
