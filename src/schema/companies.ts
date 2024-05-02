import { WebAccessibleImage } from "./common";

export interface Company {
  readonly categories: string[];
  readonly description: string;
  readonly foundedAt: string;
  readonly founders: Founder[];
  readonly images: WebAccessibleImage[];
  readonly logo: WebAccessibleImage;
  readonly name: string;
  readonly privateCompany?: true;
  readonly recommended?: true;
  readonly targetValue: number;
  readonly website?: string;
}

export interface CompanyCreate
  extends Omit<Company, "foundedAt" | "recommended"> {}

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
  readonly share: number;
}
