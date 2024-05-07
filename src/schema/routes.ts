import {
  DeleteResponse,
  ErrorCode,
  FieldErrors,
  MultipleDocsResponse
} from "./common";
import { ExistingCategory } from "./categories";
import { ExistingCompany } from "./companies";
import { ExistingUser } from "./users";
import { JwtUser } from "./auth";
import { StatusCodes } from "http-status-codes";

export interface Routes {
  readonly "*": {
    readonly BAD_REQUEST: {
      readonly "EmailMismatch": [
        StatusCodes.BAD_REQUEST,
        {
          readonly error: ErrorCode.EmailMismatch;
          readonly errorMessage: string;
        }
      ];
      readonly "InvalidCategoryData": [
        StatusCodes.BAD_REQUEST,
        {
          readonly data: FieldErrors;
          readonly error: ErrorCode.InvalidCategoryData;
          readonly errorMessage: string;
        }
      ];
      readonly "InvalidCompanyData": [
        StatusCodes.BAD_REQUEST,
        {
          readonly data: FieldErrors;
          readonly error: ErrorCode.InvalidCompanyData;
          readonly errorMessage: string;
        }
      ];
      readonly "InvalidParam": [
        StatusCodes.BAD_REQUEST,
        {
          readonly error: ErrorCode.InvalidParam;
          readonly errorMessage: string;
        }
      ];
      readonly "InvalidQuery": [
        StatusCodes.BAD_REQUEST,
        {
          readonly data: FieldErrors;
          readonly error: ErrorCode.InvalidQuery;
          readonly errorMessage: string;
        }
      ];
      readonly "InvalidUserData": [
        StatusCodes.BAD_REQUEST,
        {
          readonly data: FieldErrors;
          readonly error: ErrorCode.InvalidUserData;
          readonly errorMessage: string;
        }
      ];
    };
    readonly INTERNAL_SERVER_ERROR: [
      StatusCodes.INTERNAL_SERVER_ERROR,
      {
        readonly error: ErrorCode.InternalServerError;
        readonly errorMessage: string;
      }
    ];
    readonly NOT_FOUND: [
      StatusCodes.NOT_FOUND,
      {
        readonly error: ErrorCode.NotFound;
        readonly errorMessage: string;
      }
    ];
    readonly UNAUTHORIZED: [
      StatusCodes.UNAUTHORIZED,
      {
        readonly error: ErrorCode.Unauthorized;
        readonly errorMessage: string;
      }
    ];
  };
  readonly "/": {
    readonly GET: [StatusCodes.OK, { readonly status: ErrorCode.Ok }];
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
      readonly GET: [StatusCodes.OK, JwtUser | null];
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
          {
            readonly error: ErrorCode.CategoryNotFound;
            readonly errorMessage: string;
          }
        ];
        readonly OK: [StatusCodes.OK, ExistingCategory];
      };
      readonly PUT: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          {
            readonly error: ErrorCode.CategoryNotFound;
            readonly errorMessage: string;
          }
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
          {
            readonly error: ErrorCode.CompanyNotFound;
            readonly errorMessage: string;
          }
        ];
        readonly OK: [StatusCodes.OK, ExistingCompany];
      };
      readonly PUT: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          {
            readonly error: ErrorCode.CompanyNotFound;
            readonly errorMessage: string;
          }
        ];
        readonly OK: [StatusCodes.OK, ExistingCompany];
      };
    };
  };
  readonly "/favicon.ico": {
    readonly GET: null;
  };
  readonly "/me": {
    readonly "/": {
      readonly DELETE: Routes["/users"]["/:email"]["DELETE"];
      readonly GET: Routes["/users"]["/:email"]["GET"];
      readonly POST: Routes["/users"]["/"]["POST"];
      readonly PUT: Routes["/users"]["/:email"]["PUT"];
    };
    readonly "/companies": Routes["/users"]["/:email/companies"]["GET"];
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
          {
            readonly error: ErrorCode.UserAlreadyExists;
            readonly errorMessage: string;
          }
        ];
        readonly CREATED: [StatusCodes.CREATED, ExistingUser];
      };
    };
    readonly "/:email": {
      readonly DELETE: [StatusCodes.OK, DeleteResponse];
      readonly GET: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          {
            readonly error: ErrorCode.UserNotFound;
            readonly errorMessage: string;
          }
        ];
        readonly OK: [StatusCodes.OK, ExistingUser];
      };
      readonly PUT: {
        readonly NOT_FOUND: [
          StatusCodes.NOT_FOUND,
          {
            readonly error: ErrorCode.UserNotFound;
            readonly errorMessage: string;
          }
        ];
        readonly OK: [StatusCodes.OK, ExistingUser];
      };
    };
    readonly "/:email/companies": {
      readonly GET: [StatusCodes.OK, MultipleDocsResponse<ExistingCompany>];
    };
  };
}
