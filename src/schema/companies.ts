import { strings } from "../types";

export interface Company {
  readonly categories: strings;
  readonly header: string;
  readonly images: strings;
  readonly logo: string;
  readonly name: string;
}

export type Companies = readonly Company[];

export interface ExistingCompany extends Company {
  readonly id: string;
}

export type ExistingCompanies = readonly ExistingCompany[];
