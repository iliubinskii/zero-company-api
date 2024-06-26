/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    /** Get API status */
    get: {
      responses: {
        200: components["responses"]["Home"];
      };
    };
  };
  "/auth/me": {
    /** Get authentication response */
    get: {
      responses: {
        200: components["responses"]["AuthUser"];
      };
    };
  };
  "/categories": {
    /** Get all categories */
    get: {
      responses: {
        200: components["responses"]["CategoryList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    /** Create a new category */
    post: {
      responses: {
        201: components["responses"]["Category"];
        400: components["responses"]["InvalidData"];
      };
    };
  };
  "/categories/{id}": {
    /** Get a category by ID */
    get: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["Category"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a category by ID */
    put: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["Category"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Delete a category by ID */
    delete: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["Delete"];
      };
    };
    parameters: {
      path: {
        id: components["parameters"]["Id"];
      };
    };
  };
  "/categories/{id}/companies": {
    /** Get all companies for a category */
    get: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    parameters: {
      path: {
        id: components["parameters"]["Id"];
      };
    };
  };
  "/companies": {
    /** Get all companies */
    get: {
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    /** Create a new company */
    post: {
      responses: {
        201: components["responses"]["Company"];
        400: components["responses"]["InvalidData"];
      };
    };
  };
  "/companies/{id}": {
    /** Get a company by ID */
    get: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["Company"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a company by ID */
    put: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["Company"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Delete a company by ID */
    delete: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["Delete"];
      };
    };
    parameters: {
      path: {
        id: components["parameters"]["Id"];
      };
    };
  };
  "/companies/{id}/found": {
    /** Create founding agreement for a company */
    post: {
      responses: {
        200: components["responses"]["Company"];
        404: components["responses"]["NotFound"];
        409: components["responses"]["Conflict"];
      };
    };
  };
  "/companies/{id}/images": {
    /** Upload a new image for a company */
    post: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        201: components["responses"]["Company"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    parameters: {
      path: {
        id: components["parameters"]["Id"];
      };
    };
  };
  "/companies/{id}/images/{assetId}": {
    /** Update an image for a company */
    put: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
          assetId: components["parameters"]["AssetId"];
        };
      };
      responses: {
        200: components["responses"]["Company"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Delete an image for a company */
    delete: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
          assetId: components["parameters"]["AssetId"];
        };
      };
      responses: {
        200: components["responses"]["Company"];
        404: components["responses"]["NotFound"];
      };
    };
    parameters: {
      path: {
        id: components["parameters"]["Id"];
        assetId: components["parameters"]["AssetId"];
      };
    };
  };
  "/documents": {
    /** Get all documents */
    get: {
      responses: {
        200: components["responses"]["PopulatedDocumentList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    /** Create a new document */
    post: {
      responses: {
        201: components["responses"]["PopulatedDocument"];
        400: components["responses"]["InvalidData"];
      };
    };
  };
  "/documents/{id}": {
    /** Get a document by ID */
    get: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["PopulatedDocument"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a document by ID */
    put: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["PopulatedDocument"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Delete a document by ID */
    delete: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["Delete"];
      };
    };
    parameters: {
      path: {
        id: components["parameters"]["Id"];
      };
    };
  };
  "/me": {
    /** Get a user by ID */
    get: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a user by ID */
    put: {
      responses: {
        200: components["responses"]["User"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Create a new user */
    post: {
      responses: {
        201: components["responses"]["User"];
        400: components["responses"]["InvalidData"];
        409: components["responses"]["Conflict"];
      };
    };
    /** Delete a user by ID */
    delete: {
      responses: {
        200: components["responses"]["Delete"];
      };
    };
  };
  "/me/companies": {
    /** Get all companies for a user */
    get: {
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
  };
  "/me/documents": {
    /** Get all documents for a user */
    get: {
      responses: {
        200: components["responses"]["PopulatedDocumentList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
  };
  "/me/favorite-companies": {
    /** Get all favorite companies for a user */
    get: {
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
  };
  "/users": {
    /** Get all users */
    get: {
      responses: {
        200: components["responses"]["UserList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    /** Create a new user */
    post: {
      responses: {
        201: components["responses"]["User"];
        400: components["responses"]["InvalidData"];
        409: components["responses"]["Conflict"];
      };
    };
  };
  "/users/{id}": {
    /** Get a user by ID */
    get: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a user by ID */
    put: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["User"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Delete a user by ID */
    delete: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["Delete"];
      };
    };
    parameters: {
      path: {
        id: components["parameters"]["Id"];
      };
    };
  };
  "/users/{id}/companies": {
    /** Get all companies for a user */
    get: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    parameters: {
      path: {
        id: components["parameters"]["Id"];
      };
    };
  };
  "/users/{id}/documents": {
    /** Get all documents for a user */
    get: {
      responses: {
        200: components["responses"]["PopulatedDocumentList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
  };
  "/users/{id}/favorite-companies": {
    /** Get all favorite companies for a user */
    get: {
      parameters: {
        path: {
          id: components["parameters"]["Id"];
        };
      };
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    parameters: {
      path: {
        id: components["parameters"]["Id"];
      };
    };
  };
  "/400": {
    /** Bad request */
    get: {
      responses: {
        400: components["responses"]["BadRequest"];
      };
    };
  };
  "/401": {
    /** Unauthorized */
    get: {
      responses: {
        401: components["responses"]["Unauthorized"];
      };
    };
  };
  "/404": {
    /** Not found */
    get: {
      responses: {
        404: components["responses"]["NotFound"];
      };
    };
  };
  "/405": {
    /** Method not allowed */
    get: {
      responses: {
        405: components["responses"]["MethodNotAllowed"];
      };
    };
  };
  "/500": {
    /** Internal server error */
    get: {
      responses: {
        500: components["responses"]["InternalServerError"];
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    AuthUser: {
      admin: boolean;
      email: string;
    } | null;
    BadRequest: {
      /** @enum {string} */
      error: "BadRequest" | "InvalidIdParam";
      errorMessage: string;
    };
    Category: {
      _id: string;
      description: string;
      name: string;
      pinned?: boolean;
      tagline: string;
    };
    CategoryList: {
      count: number;
      docs: components["schemas"]["Category"][];
      nextCursor?: string[];
      total: number;
    };
    Company: {
      _id: string;
      categories: string[];
      country: string;
      createdAt: string;
      description?: string;
      foundedAt?: string;
      foundingAgreement?: string;
      founders: components["schemas"]["Founder"][];
      images: components["schemas"]["WebAccessibleImage"][];
      logo?: components["schemas"]["WebAccessibleImage"];
      name?: string;
      privateCompany?: boolean;
      recommended?: boolean;
      /** @enum {string} */
      status: "draft" | "founded";
      targetValue?: number;
      website?: string;
    };
    CompanyList: {
      count: number;
      docs: components["schemas"]["Company"][];
      nextCursor?: string[];
      total: number;
    };
    Conflict: {
      /** @enum {string} */
      error: "AlreadyExists" | "Conflict";
      errorMessage: string;
    };
    Delete: {
      affectedRows: number;
    };
    DigitalDocument: {
      signatures: components["schemas"]["Signature"][];
      status?: string;
      submissionId: number;
    };
    Document: {
      _id: string;
      company: string;
      createdAt: string;
      doc: components["schemas"]["DigitalDocument"];
      metadata?: string;
      signatories: components["schemas"]["Signatory"][];
      /** @enum {string} */
      type: "FoundingAgreement";
    };
    DocumentList: {
      count: number;
      docs: components["schemas"]["Document"][];
      nextCursor?: string[];
      total: number;
    };
    Founder: {
      email: string;
      name?: string;
      share?: number;
    };
    Home: {
      schema: string;
      /** @enum {string} */
      status: "OK";
    };
    InternalServerError: {
      /** @enum {string} */
      error: "InternalServerError";
      errorMessage: string;
    };
    InvalidData: {
      /** @enum {string} */
      error: "InvalidData";
      errorMessage: string;
      data: {
        message: string;
        path: string;
      }[];
    };
    InvalidIdParam: {
      /** @enum {string} */
      error: "InvalidIdParam";
      errorMessage: string;
    };
    InvalidQuery: {
      /** @enum {string} */
      error: "InvalidQuery";
      errorMessage: string;
      data: {
        message: string;
        path: string;
      }[];
    };
    MethodNotAllowed: {
      /** @enum {string} */
      error: "MethodNotAllowed";
      errorMessage: string;
    };
    NotFound: {
      /** @enum {string} */
      error: "NotFound";
      errorMessage: string;
    };
    PopulatedDocument: {
      _id: string;
      company?: components["schemas"]["Company"];
      createdAt: string;
      doc: components["schemas"]["DigitalDocument"];
      metadata?: string;
      signatories: components["schemas"]["Signatory"][];
      /** @enum {string} */
      type: "FoundingAgreement";
    };
    PopulatedDocumentList: {
      count: number;
      docs: components["schemas"]["PopulatedDocument"][];
      nextCursor?: string[];
      total: number;
    };
    Signatory: {
      email: string;
      name?: string;
      role: string;
    };
    Signature: {
      email: string;
      embedSrc: string;
      name?: string;
      role: string;
      status: string;
    };
    Unauthorized: {
      /** @enum {string} */
      error: "Unauthorized";
      errorMessage: string;
    };
    User: {
      _id: string;
      email: string;
      favoriteCompanies: string[];
      firstName?: string;
      lastName?: string;
    };
    UserList: {
      count: number;
      docs: components["schemas"]["User"][];
      nextCursor?: string[];
      total: number;
    };
    WebAccessibleImage: {
      assetId: string;
      height: number;
      name: string;
      secureUrl: string;
      url: string;
      width: number;
    };
  };
  responses: {
    /** @description Authentication response */
    AuthUser: {
      content: {
        "application/json": components["schemas"]["AuthUser"];
      };
    };
    /** @description Bad request */
    BadRequest: {
      content: {
        "application/json": components["schemas"]["BadRequest"];
      };
    };
    /** @description Category */
    Category: {
      content: {
        "application/json": components["schemas"]["Category"];
      };
    };
    /** @description Category list */
    CategoryList: {
      content: {
        "application/json": components["schemas"]["CategoryList"];
      };
    };
    /** @description Company */
    Company: {
      content: {
        "application/json": components["schemas"]["Company"];
      };
    };
    /** @description Company list */
    CompanyList: {
      content: {
        "application/json": components["schemas"]["CompanyList"];
      };
    };
    /** @description Already exists */
    Conflict: {
      content: {
        "application/json": components["schemas"]["Conflict"];
      };
    };
    /** @description Delete */
    Delete: {
      content: {
        "application/json": components["schemas"]["Delete"];
      };
    };
    /** @description Document */
    Document: {
      content: {
        "application/json": components["schemas"]["Document"];
      };
    };
    /** @description Document list */
    DocumentList: {
      content: {
        "application/json": components["schemas"]["DocumentList"];
      };
    };
    /** @description Home */
    Home: {
      content: {
        "application/json": components["schemas"]["Home"];
      };
    };
    /** @description Internal server error */
    InternalServerError: {
      content: {
        "application/json": components["schemas"]["InternalServerError"];
      };
    };
    /** @description Invalid data */
    InvalidData: {
      content: {
        "application/json": components["schemas"]["InvalidData"];
      };
    };
    /** @description Invalid query */
    InvalidQuery: {
      content: {
        "application/json": components["schemas"]["InvalidQuery"];
      };
    };
    /** @description Method not allowed */
    MethodNotAllowed: {
      content: {
        "application/json": components["schemas"]["MethodNotAllowed"];
      };
    };
    /** @description Not found */
    NotFound: {
      content: {
        "application/json": components["schemas"]["NotFound"];
      };
    };
    /** @description Document */
    PopulatedDocument: {
      content: {
        "application/json": components["schemas"]["PopulatedDocument"];
      };
    };
    /** @description Document list */
    PopulatedDocumentList: {
      content: {
        "application/json": components["schemas"]["PopulatedDocumentList"];
      };
    };
    /** @description Bad request */
    Unauthorized: {
      content: {
        "application/json": components["schemas"]["Unauthorized"];
      };
    };
    /** @description User */
    User: {
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
    /** @description User list */
    UserList: {
      content: {
        "application/json": components["schemas"]["UserList"];
      };
    };
  };
  parameters: {
    Id: string;
    AssetId: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
