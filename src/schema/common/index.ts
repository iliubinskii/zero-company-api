export enum ErrorCode {
  AuthenticationFailed = "AuthenticationFailed",
  CategoryNotFound = "CategoryNotFound",
  CompanyNotFound = "CompanyNotFound",
  EmailMismatch = "EmailMismatch",
  InternalServerError = "InternalServerError",
  InvalidCategoryData = "InvalidCategoryData",
  InvalidCompanyData = "InvalidCompanyData",
  InvalidParam = "InvalidParam",
  InvalidQuery = "InvalidQuery",
  InvalidUserData = "InvalidUserData",
  NotFound = "NotFound",
  Ok = "Ok",
  Unauthorized = "Unauthorized",
  UserAlreadyExists = "UserAlreadyExists",
  UserNotFound = "UserNotFound"
}

export interface DeleteResponse {
  readonly affectedRows: number;
}

export interface FieldError {
  readonly message: string;
  readonly path: string;
}

export type FieldErrors = readonly FieldError[];

export interface MultipleDocsResponse<T> {
  readonly docs: readonly T[];
  readonly total: number;
}

export interface WebAccessibleImage {
  readonly assetId: string;
  readonly height: number;
  readonly secureUrl: string;
  readonly url: string;
  readonly width: number;
}

export type WebAccessibleImages = readonly WebAccessibleImage[];
