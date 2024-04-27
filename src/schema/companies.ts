import { WebAccessibleImage } from "./common";

export interface Company {
  readonly categories: string[];
  readonly header: WebAccessibleImage;
  readonly images: WebAccessibleImage[];
  readonly logo: WebAccessibleImage;
  readonly name: string;
}

export type Companies = readonly Company[];

export interface ExistingCompany extends Company {
  readonly _id: string;
}

export type ExistingCompanies = readonly ExistingCompany[];

export interface GetCompaniesResponse {
  readonly docs: ExistingCompanies;
  readonly total: number;
}
