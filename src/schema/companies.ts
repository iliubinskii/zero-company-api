import type {
  CompanyStatus,
  Founder,
  MultipleDocsResponse,
  Update,
  WebAccessibleImage
} from "./common";

export interface Company {
  readonly categories: readonly string[];
  readonly country: string;
  readonly createdAt: Date;
  readonly description?: string | null | undefined;
  readonly foundedAt?: Date | null | undefined;
  readonly founders: readonly Founder[];
  readonly foundingAgreement?: string | null | undefined;
  readonly images: readonly WebAccessibleImage[];
  readonly logo?: WebAccessibleImage | null | undefined;
  readonly name?: string | null | undefined;
  readonly privateCompany?: boolean | null | undefined;
  readonly recommended?: boolean | null | undefined;
  readonly status: CompanyStatus;
  readonly targetValue?: number | null | undefined;
  readonly website?: string | null | undefined;
}

export interface CompanyCreate
  extends Pick<Company, "categories" | "country"> {}

export interface CompanyUpdate
  extends Update<
    Pick<
      Company,
      | "categories"
      | "description"
      | "founders"
      | "logo"
      | "name"
      | "privateCompany"
      | "targetValue"
      | "website"
    >
  > {
  readonly addImages?: readonly WebAccessibleImage[] | null | undefined;
  readonly removeImages?: readonly string[] | null | undefined;
}

export interface ExistingCompany extends Company {
  readonly _id: string;
}

export type ExistingCompanies = MultipleDocsResponse<ExistingCompany>;
