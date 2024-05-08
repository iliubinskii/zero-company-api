import { WebAccessibleImage, WebAccessibleImages } from "./common";
import { strings } from "../types";

export interface Company {
  readonly categories: strings;
  readonly description: string;
  readonly foundedAt: string;
  readonly founders: Founders;
  readonly images: WebAccessibleImages;
  readonly logo: WebAccessibleImage;
  readonly name: string;
  readonly privateCompany?: true;
  readonly recommended?: true;
  readonly targetValue: number;
  readonly website?: string;
}

export interface CompanyCreate
  extends Omit<Company, "founders" | "foundedAt" | "recommended"> {
  readonly founders: readonly Omit<Founder, "confirmed">[];
}

export interface CompanyUpdate
  extends Partial<
    Omit<
      Company,
      "categories" | "foundedAt" | "founders" | "recommended" | "targetValue"
    >
  > {}

export type Companies = readonly Company[];

export interface ExistingCompany extends Company {
  readonly _id: string;
}

export type ExistingCompanies = readonly ExistingCompany[];

export interface Founder {
  readonly confirmed?: true;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly share: number;
}

export type Founders = readonly Founder[];

export interface GetCompaniesOptions {
  readonly category?: string;
  readonly founderEmail?: string;
  readonly limit?: number;
  readonly offset?: number;
}
