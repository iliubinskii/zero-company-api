import type { Update, WebAccessibleImage } from "./common";

export interface Company {
  readonly categories: readonly string[];
  readonly description: string;
  readonly foundedAt: string;
  readonly founders: readonly Founder[];
  readonly images: WebAccessibleImage[];
  readonly logo: WebAccessibleImage;
  readonly name: string;
  readonly privateCompany?: boolean;
  readonly recommended?: boolean;
  readonly targetValue: number;
  readonly website?: string;
}

export interface CompanyCreate
  extends Omit<Company, "foundedAt" | "recommended"> {
  readonly founders: readonly FounderCreate[];
}

export interface CompanyUpdate
  extends Update<
    Omit<
      Company,
      "categories" | "foundedAt" | "founders" | "recommended" | "targetValue"
    >
  > {}

export interface ExistingCompany extends Company {
  readonly _id: string;
}

export interface Founder {
  readonly confirmed?: boolean;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly share: number;
}

export interface FounderCreate extends Omit<Founder, "confirmed"> {}
