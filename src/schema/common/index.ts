export enum ErrorCode {
  AuthenticationFailed = "AuthenticationFailed",
  CategoryNotFound = "CategoryNotFound",
  CompanyNotFound = "CompanyNotFound",
  EmailMismatch = "EmailMismatch",
  InternalServerError = "InternalServerError",
  InvalidCategoryData = "InvalidCategoryData",
  InvalidCompanyData = "InvalidCompanyData",
  InvalidFounderConfirmedStatus = "InvalidFounderConfirmedStatus",
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
