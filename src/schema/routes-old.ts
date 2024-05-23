import type { AuthUser, ExistingUser } from "./users";
import type {
  DeleteResponse,
  ErrorCode,
  ErrorResponse,
  ErrorResponseWithData,
  MultipleDocsResponse
} from "./common";
import type { ExistingCategory } from "./categories";
import type { ExistingCompany } from "./companies";
import type { StatusCodes } from "http-status-codes";

export interface RoutesOld {
  readonly "*": {
    readonly BAD_REQUEST: {
      readonly "InvalidCategoryData": [
        StatusCodes.BAD_REQUEST,
        ErrorResponseWithData<ErrorCode.InvalidCategoryData>
      ];
      readonly "InvalidCompanyData": [
        StatusCodes.BAD_REQUEST,
        ErrorResponseWithData<ErrorCode.InvalidCompanyData>
      ];
      readonly "InvalidParam": [
        StatusCodes.BAD_REQUEST,
        ErrorResponse<ErrorCode.InvalidParam>
      ];
      readonly "InvalidQuery": [
        StatusCodes.BAD_REQUEST,
        ErrorResponseWithData<ErrorCode.InvalidQuery>
      ];
      readonly "InvalidUserData": [
        StatusCodes.BAD_REQUEST,
        ErrorResponseWithData<ErrorCode.InvalidUserData>
      ];
    };
    readonly INTERNAL_SERVER_ERROR: [
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorResponse<ErrorCode.InternalServerError>
    ];
    readonly NOT_FOUND: [
      StatusCodes.NOT_FOUND,
      ErrorResponse<ErrorCode.NotFound>
    ];
    readonly UNAUTHORIZED: [
      StatusCodes.UNAUTHORIZED,
      ErrorResponse<ErrorCode.Unauthorized>
    ];
    readonly UNSECURED_URL: [
      StatusCodes.METHOD_NOT_ALLOWED,
      ErrorResponse<ErrorCode.MethodNotAllowed>
    ];
  };
  readonly "/": {
    readonly GET: [
      StatusCodes.OK,
      {
        readonly schema: string;
        readonly status: ErrorCode.OK;
      }
    ];
  };
  readonly "/auth": {
    readonly "/callback": {
      readonly GET: null;
    };
    readonly "/login": {
      readonly GET: null;
    };
    readonly "/logout": {
      readonly GET: null;
    };
    readonly "/me": {
      readonly GET: [StatusCodes.OK, AuthUser | null];
    };
  };
  readonly "/categories": {
    readonly "/": {
      readonly GET: [StatusCodes.OK, MultipleDocsResponse<ExistingCategory>];
      readonly POST: [StatusCodes.CREATED, ExistingCategory];
    };
    readonly "/:id": {
      readonly DELETE: [StatusCodes.OK, DeleteResponse];
      readonly GET: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.CategoryNotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingCategory];
      };
      readonly PUT: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.CategoryNotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingCategory];
      };
    };
    readonly "/:id/companies": {
      readonly GET: [StatusCodes.OK, MultipleDocsResponse<ExistingCompany>];
    };
  };
  readonly "/companies": {
    readonly "/": {
      readonly GET: [StatusCodes.OK, MultipleDocsResponse<ExistingCompany>];
      readonly POST: [StatusCodes.CREATED, ExistingCompany];
    };
    readonly "/:id": {
      readonly DELETE: [StatusCodes.OK, DeleteResponse];
      readonly GET: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.CompanyNotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingCompany];
      };
      readonly PUT: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.CompanyNotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingCompany];
      };
    };
  };
  readonly "/me": {
    readonly "/": {
      readonly DELETE: RoutesOld["/users"]["/:email"]["DELETE"];
      readonly GET: RoutesOld["/users"]["/:email"]["GET"];
      readonly POST: RoutesOld["/users"]["/"]["POST"];
      readonly PUT: RoutesOld["/users"]["/:email"]["PUT"];
    };
    readonly "/companies": RoutesOld["/users"]["/:email/companies"]["GET"];
  };
  readonly "/test": {
    readonly "/async-reject": {
      readonly GET: null;
    };
    readonly "/sync-reject": {
      readonly GET: null;
    };
  };
  readonly "/users": {
    readonly "/": {
      readonly GET: [StatusCodes.OK, MultipleDocsResponse<ExistingUser>];
      readonly POST: {
        readonly CONFLICT: [
          StatusCodes.CONFLICT,
          ErrorResponse<ErrorCode.UserAlreadyExists>
        ];
        readonly CREATED: [StatusCodes.CREATED, ExistingUser];
      };
    };
    readonly "/:email": {
      readonly DELETE: [StatusCodes.OK, DeleteResponse];
      readonly GET: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.UserNotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingUser];
      };
      readonly PUT: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.UserNotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingUser];
      };
    };
    readonly "/:email/companies": {
      readonly GET: [StatusCodes.OK, MultipleDocsResponse<ExistingCompany>];
    };
  };
}
