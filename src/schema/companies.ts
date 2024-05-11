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
  readonly privateCompany?: boolean;
  readonly recommended?: boolean;
  readonly targetValue: number;
  readonly website?: string;
}

export interface CompanyCreate
  extends Omit<Company, "foundedAt" | "founders" | "recommended"> {
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
  readonly confirmed?: boolean;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly share: number;
}

export type Founders = readonly Founder[];
