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

export type ExistingCompanies = MultipleDocsResponse<ExistingCompany>;
