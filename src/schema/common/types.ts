export enum ErrorCode {
  AuthenticationFailed = "AuthenticationFailed",
  BadRequest = "BadRequest",
  CategoryNotFound = "CategoryNotFound",
  CompanyNotFound = "CompanyNotFound",
  InternalServerError = "InternalServerError",
  InvalidCategoryData = "InvalidCategoryData",
  InvalidCompanyData = "InvalidCompanyData",
  InvalidEmailParam = "InvalidEmailParam",
  InvalidIdParam = "InvalidIdParam",
  InvalidParam = "InvalidParam",
  InvalidQuery = "InvalidQuery",
  InvalidUserData = "InvalidUserData",
  MethodNotAllowed = "MethodNotAllowed",
  NotFound = "NotFound",
  OK = "OK",
  Unauthorized = "Unauthorized",
  UserAlreadyExists = "UserAlreadyExists",
  UserNotFound = "UserNotFound"
}

export interface DeleteResponse {
  readonly affectedRows: number;
}

export interface ErrorResponse<E extends ErrorCode> {
  readonly error: E;
  readonly errorMessage: string;
}

export interface ErrorResponseWithData<E extends ErrorCode> {
  readonly data: readonly FieldError[];
  readonly error: E;
  readonly errorMessage: string;
}

export interface FieldError {
  readonly message: string;
  readonly path: string;
}

export interface MultipleDocsResponse<T> {
  readonly count: number;
  readonly docs: readonly T[];
  readonly nextCursor?: readonly [string, string];
  readonly total: number;
}

export type Update<T> = {
  [K in keyof T]?: undefined extends T[K]
    ? Exclude<T[K], undefined> | null
    : T[K];
};

export type ValidationResult<T> = {
  [K in keyof T]: undefined extends T[K]
    ? ValidationResult<T[K]> | undefined
    : ValidationResult<T[K]>;
};

export interface WebAccessibleImage {
  readonly assetId: string;
  readonly height: number;
  readonly secureUrl: string;
  readonly url: string;
  readonly width: number;
}
