import type {
  Company,
  CompanyUpdate,
  ExistingCompany,
  GetCompaniesOptions,
  MultipleDocsResponse
} from "../schema";
import type { CrudService } from "./crud";
import type { RequestHandler } from "express";
import type mongoose from "mongoose";

export interface CompanyControllers {
  readonly addCompany: RequestHandler;
  readonly deleteCompany: RequestHandler;
  readonly getCompanies: RequestHandler;
  readonly getCompany: RequestHandler;
  readonly updateCompany: RequestHandler;
}

export interface CompaniesMiddleware {
  readonly parseFormData: RequestHandler;
  readonly webAccessibleStorage: RequestHandler;
}

export interface CompaniesService {
  /**
   * Adds a company to the database.
   * @param company - The company to add.
   * @returns A promise that resolves when the company has been added.
   */
  readonly addCompany: (company: Company) => Promise<RawExistingCompany>;
  readonly crudService: CrudService<Company, CompanyUpdate>;
  /**
   * Deletes a company from the database.
   * @param id - The ID of the company to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteCompany: (id: string) => Promise<number>;
  /**
   * Gets all companies from the database.
   * @param options - The options to use when getting companies.
   * @param parentRef - The parent reference to use when getting companies.
   * @returns A promise that resolves with all companies in the database.
   */
  readonly getCompanies: (
    options?: GetCompaniesOptions,
    parentRef?: GetCompaniesParentRef
  ) => Promise<RawExistingCompanies>;
  /**
   * Gets a company from the database.
   * @param id - The ID of the company to get.
   * @returns A promise that resolves with the company, or `undefined` if the company was not found.
   */
  readonly getCompany: (id: string) => Promise<RawExistingCompany | null>;
  /**
   * Updates a company in the database.
   * @param id - The ID of the company to update.
   * @param company - The company data to update.
   * @returns A promise that resolves with the updated company, or `undefined` if the company was not found.
   */
  readonly updateCompany: (
    id: string,
    company: CompanyUpdate
  ) => Promise<RawExistingCompany | null>;
}

export type GetCompaniesParentRef =
  | {
      readonly category: string;
      readonly type: "category";
    }
  | {
      readonly founderEmail: string;
      readonly type: "founderEmail";
    }
  | {
      readonly founderId: string;
      readonly type: "founderId";
    };

export interface RawExistingCompany extends Omit<ExistingCompany, "_id"> {
  readonly _id: mongoose.Types.ObjectId;
}

export type RawExistingCompanies = MultipleDocsResponse<RawExistingCompany>;
