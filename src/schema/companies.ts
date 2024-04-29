import { WebAccessibleImage } from "./common";

export interface Company {
  readonly categories: string[];
  readonly description: string;
  readonly discoverable: boolean;
  readonly foundedAt: string;
  readonly founders: Founder[];
  readonly header: WebAccessibleImage;
  readonly images: WebAccessibleImage[];
  readonly logo: WebAccessibleImage;
  readonly name: string;
  readonly recommended: boolean;
  readonly targetValue: number;
  readonly website: string;
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

export interface Founder {
  readonly confirmed: boolean;
  readonly email: string;
  readonly share: number;
}
