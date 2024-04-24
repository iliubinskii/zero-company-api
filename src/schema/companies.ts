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
  readonly _id: { readonly $oid: string };
}
