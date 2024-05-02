import {
  CompanyCreate,
  CompanyUpdate,
  ExistingCompany,
  MultipleDocsResponse
} from "../schema";
import { RequestHandler } from "express";

export interface CompanyControllers {
  readonly addCompany: RequestHandler;
  readonly deleteCompany: RequestHandler;
  readonly getCompanies: RequestHandler;
  readonly getCompany: RequestHandler;
  readonly updateCompany: RequestHandler;
}

export interface CompaniesMiddleware {
  readonly parseFormData: RequestHandler;
  readonly requireValidCompany: RequestHandler;
  readonly requireValidCompanyUpdate: RequestHandler;
  readonly requireValidGetCompaniesOptions: RequestHandler;
  readonly webAccessibleStorage: RequestHandler;
}

export interface CompaniesService {
  /**
   * Adds a company to the database.
   * @param company - The company to add.
   * @returns A promise that resolves when the company has been added.
   */
  readonly addCompany: (company: CompanyCreate) => Promise<ExistingCompany>;
  /**
   * Deletes a company from the database.
   * @param id - The ID of the company to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteCompany: (id: string) => Promise<number>;
  /**
   * Gets all companies from the database.
   * @param options - The options to use when getting companies.
   * @returns A promise that resolves with all companies in the database.
   */
  readonly getCompanies: (
    options?: GetCompaniesOptions
  ) => Promise<MultipleDocsResponse<ExistingCompany>>;
  /**
   * Gets a company from the database.
   * @param id - The ID of the company to get.
   * @returns A promise that resolves with the company, or `undefined` if the company was not found.
   */
  readonly getCompany: (id: string) => Promise<ExistingCompany | undefined>;
  /**
   * Updates a company in the database.
   * @param id - The ID of the company to update.
   * @param company - The company data to update.
   * @returns A promise that resolves with the updated company, or `undefined` if the company was not found.
   */
  readonly updateCompany: (
    id: string,
    company: CompanyUpdate
  ) => Promise<ExistingCompany | undefined>;
}

export interface GetCompaniesOptions {
  readonly category?: string;
  readonly founderEmail?: string;
  readonly limit?: number;
  readonly offset?: number;
}
