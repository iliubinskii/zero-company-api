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
        409: components["responses"]["AlreadyExists"];
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
  "/400": {
    /** Bad request */
    get: {
      responses: {
        400: components["responses"]["BadRequest"];
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
    AlreadyExists: {
      /** @enum {string} */
      error: "AlreadyExists";
      errorMessage: string;
    };
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
      description: string;
      foundedAt: string;
      founders: components["schemas"]["Founder"][];
      images: components["schemas"]["WebAccessibleImage"][];
      logo: components["schemas"]["WebAccessibleImage"];
      name: string;
      privateCompany?: boolean;
      recommended?: boolean;
      targetValue: number;
      website?: string;
    };
    CompanyList: {
      count: number;
      docs: components["schemas"]["Company"][];
      nextCursor?: string[];
      total: number;
    };
    Delete: {
      affectedRows: number;
    };
    Founder: {
      confirmed?: boolean;
      email: string;
      firstName: string;
      lastName: string;
      share: number;
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
    NotFound: {
      /** @enum {string} */
      error: "NotFound";
      errorMessage: string;
    };
    User: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
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
      secureUrl: string;
      url: string;
      width: number;
    };
  };
  responses: {
    /** @description User already exists */
    AlreadyExists: {
      content: {
        "application/json": components["schemas"]["AlreadyExists"];
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
    /** @description Category not found */
    NotFound: {
      content: {
        "application/json": components["schemas"]["NotFound"];
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
    /** @description Delete */
    Delete: {
      content: {
        "application/json": components["schemas"]["Delete"];
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
    /** @description Invalid query */
    InvalidQuery: {
      content: {
        "application/json": components["schemas"]["InvalidQuery"];
      };
    };
    /** @description Invalid data */
    InvalidData: {
      content: {
        "application/json": components["schemas"]["InvalidData"];
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
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
