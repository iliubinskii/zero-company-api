import type { Update, WebAccessibleImage } from "./common";

export const COMPANY_STATUS = {
  draft: "draft",
  founded: "founded",
  signing: "signing"
} as const;

export interface Company {
  readonly categories: readonly string[];
  readonly country: string;
  readonly description?: string;
  readonly foundedAt?: string;
  readonly founders: readonly Founder[];
  readonly images: readonly WebAccessibleImage[];
  readonly logo?: WebAccessibleImage;
  readonly name?: string;
  readonly privateCompany?: boolean;
  readonly recommended?: boolean;
  readonly status: (typeof COMPANY_STATUS)[keyof typeof COMPANY_STATUS];
  readonly targetValue?: number;
  readonly website?: string;
}

export interface CompanyCreate
  extends Pick<Company, "categories" | "country"> {}

export interface CompanyUpdate
  extends Update<
    Omit<Company, "categories" | "country" | "foundedAt" | "recommended">
  > {}

export interface ExistingCompany extends Company {
  readonly _id: string;
}

export interface Founder {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly share: number;
}
