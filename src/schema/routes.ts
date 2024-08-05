/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get API status */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Home"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get authentication response */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["AuthUser"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/categories": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all categories */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CategoryList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    /** Create a new category */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        201: components["responses"]["Category"];
        400: components["responses"]["InvalidData"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/categories/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: components["parameters"]["Id"];
      };
      cookie?: never;
    };
    /** Get a category by ID */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Category"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a category by ID */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Category"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    post?: never;
    /** Delete a category by ID */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Delete"];
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/categories/{id}/companies": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: components["parameters"]["Id"];
      };
      cookie?: never;
    };
    /** Get all companies for a category */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/companies": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all companies */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    /** Create a new company */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        201: components["responses"]["Company"];
        400: components["responses"]["InvalidData"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/companies/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: components["parameters"]["Id"];
      };
      cookie?: never;
    };
    /** Get a company by ID */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Company"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a company by ID */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Company"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    post?: never;
    /** Delete a company by ID */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Delete"];
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/companies/{id}/found": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create founding agreement for a company */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Company"];
        404: components["responses"]["NotFound"];
        409: components["responses"]["Conflict"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/companies/{id}/images": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: components["parameters"]["Id"];
      };
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Upload a new image for a company */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        201: components["responses"]["Company"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/companies/{id}/images/{assetId}": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: components["parameters"]["Id"];
        assetId: components["parameters"]["AssetId"];
      };
      cookie?: never;
    };
    get?: never;
    /** Update an image for a company */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
          assetId: components["parameters"]["AssetId"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Company"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    post?: never;
    /** Delete an image for a company */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
          assetId: components["parameters"]["AssetId"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Company"];
        404: components["responses"]["NotFound"];
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/documents": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all documents */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PopulatedDocumentList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    /** Create a new document */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        201: components["responses"]["PopulatedDocument"];
        400: components["responses"]["InvalidData"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/documents/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: components["parameters"]["Id"];
      };
      cookie?: never;
    };
    /** Get a document by ID */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PopulatedDocument"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a document by ID */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PopulatedDocument"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    post?: never;
    /** Delete a document by ID */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Delete"];
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get a user by ID */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a user by ID */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["User"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Create a new user */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        201: components["responses"]["User"];
        400: components["responses"]["InvalidData"];
        409: components["responses"]["Conflict"];
      };
    };
    /** Delete a user by ID */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Delete"];
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/me/companies": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all companies for a user */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/me/documents": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all documents for a user */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PopulatedDocumentList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/me/favorite-companies": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all favorite companies for a user */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all users */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["UserList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    /** Create a new user */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        201: components["responses"]["User"];
        400: components["responses"]["InvalidData"];
        409: components["responses"]["Conflict"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: components["parameters"]["Id"];
      };
      cookie?: never;
    };
    /** Get a user by ID */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["NotFound"];
      };
    };
    /** Update a user by ID */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["User"];
        400: components["responses"]["InvalidData"];
        404: components["responses"]["NotFound"];
      };
    };
    post?: never;
    /** Delete a user by ID */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["Delete"];
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/{id}/companies": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: components["parameters"]["Id"];
      };
      cookie?: never;
    };
    /** Get all companies for a user */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/{id}/documents": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get all documents for a user */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PopulatedDocumentList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/{id}/favorite-companies": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: components["parameters"]["Id"];
      };
      cookie?: never;
    };
    /** Get all favorite companies for a user */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: components["parameters"]["Id"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CompanyList"];
        400: components["responses"]["InvalidQuery"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/400": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Bad request */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        400: components["responses"]["BadRequest"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/401": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Unauthorized */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        401: components["responses"]["Unauthorized"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/404": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Not found */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        404: components["responses"]["NotFound"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/405": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Method not allowed */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        405: components["responses"]["MethodNotAllowed"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/500": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Internal server error */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        500: components["responses"]["InternalServerError"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
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
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["AuthUser"];
      };
    };
    /** @description Bad request */
    BadRequest: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["BadRequest"];
      };
    };
    /** @description Category */
    Category: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Category"];
      };
    };
    /** @description Category list */
    CategoryList: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["CategoryList"];
      };
    };
    /** @description Company */
    Company: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Company"];
      };
    };
    /** @description Company list */
    CompanyList: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["CompanyList"];
      };
    };
    /** @description Already exists */
    Conflict: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Conflict"];
      };
    };
    /** @description Delete */
    Delete: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Delete"];
      };
    };
    /** @description Document */
    Document: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Document"];
      };
    };
    /** @description Document list */
    DocumentList: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["DocumentList"];
      };
    };
    /** @description Home */
    Home: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Home"];
      };
    };
    /** @description Internal server error */
    InternalServerError: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["InternalServerError"];
      };
    };
    /** @description Invalid data */
    InvalidData: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["InvalidData"];
      };
    };
    /** @description Invalid query */
    InvalidQuery: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["InvalidQuery"];
      };
    };
    /** @description Method not allowed */
    MethodNotAllowed: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["MethodNotAllowed"];
      };
    };
    /** @description Not found */
    NotFound: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["NotFound"];
      };
    };
    /** @description Document */
    PopulatedDocument: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["PopulatedDocument"];
      };
    };
    /** @description Document list */
    PopulatedDocumentList: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["PopulatedDocumentList"];
      };
    };
    /** @description Bad request */
    Unauthorized: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Unauthorized"];
      };
    };
    /** @description User */
    User: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
    /** @description User list */
    UserList: {
      headers: {
        [name: string]: unknown;
      };
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

export type operations = Record<string, never>;
