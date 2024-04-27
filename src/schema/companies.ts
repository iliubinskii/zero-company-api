export interface Company {
  readonly categories: string[];
  readonly header: string;
  readonly images: string[];
  readonly logo: string;
  readonly name: string;
}

export type Companies = readonly Company[];

export interface ExistingCompany extends Company {
  readonly id: string;
}

export type ExistingCompanies = readonly ExistingCompany[];
