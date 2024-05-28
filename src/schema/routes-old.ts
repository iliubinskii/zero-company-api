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
      readonly "InvalidData": [
        StatusCodes.BAD_REQUEST,
        ErrorResponseWithData<ErrorCode.InvalidData>
      ];
      readonly "InvalidQuery": [
        StatusCodes.BAD_REQUEST,
        ErrorResponseWithData<ErrorCode.InvalidQuery>
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
          ErrorResponse<ErrorCode.NotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingCategory];
      };
      readonly PUT: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.NotFound>
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
          ErrorResponse<ErrorCode.NotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingCompany];
      };
      readonly PUT: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.NotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingCompany];
      };
    };
  };
  readonly "/me": {
    readonly "/": {
      readonly DELETE: RoutesOld["/users"]["/:id"]["DELETE"];
      readonly GET: RoutesOld["/users"]["/:id"]["GET"];
      readonly POST: RoutesOld["/users"]["/"]["POST"];
      readonly PUT: RoutesOld["/users"]["/:id"]["PUT"];
    };
    readonly "/companies": RoutesOld["/users"]["/:id/companies"]["GET"];
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
          ErrorResponse<ErrorCode.AlreadyExists>
        ];
        readonly CREATED: [StatusCodes.CREATED, ExistingUser];
      };
    };
    readonly "/:id": {
      readonly DELETE: [StatusCodes.OK, DeleteResponse];
      readonly GET: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.NotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingUser];
      };
      readonly PUT: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          ErrorResponse<ErrorCode.NotFound>
        ];
        readonly OK: [StatusCodes.OK, ExistingUser];
      };
    };
    readonly "/:id/companies": {
      readonly GET: [StatusCodes.OK, MultipleDocsResponse<ExistingCompany>];
    };
  };
}
