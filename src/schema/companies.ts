import type { CompanyStatus, Update, WebAccessibleImage } from "./common";

export interface Company {
  readonly categories: readonly string[];
  readonly country: string;
  readonly createdAt: string;
  readonly description?: string | undefined;
  readonly foundedAt?: string | undefined;
  readonly founders: readonly Founder[];
  readonly images: readonly WebAccessibleImage[];
  readonly logo?: WebAccessibleImage | undefined;
  readonly name?: string | undefined;
  readonly privateCompany?: boolean | undefined;
  readonly recommended?: boolean | undefined;
  readonly status: CompanyStatus;
  readonly targetValue?: number | undefined;
  readonly website?: string | undefined;
}

export interface CompanyCreate
  extends Pick<Company, "categories" | "country"> {}

export interface CompanyUpdate
  extends Update<
    Pick<
      Company,
      | "description"
      | "founders"
      | "images"
      | "logo"
      | "name"
      | "privateCompany"
      | "website"
    >
  > {}

export interface ExistingCompany extends Company {
  readonly _id: string;
}

export interface Founder {
  readonly email: string;
  readonly firstName?: string | undefined;
  readonly lastName?: string | undefined;
  readonly share?: number | undefined;
}
