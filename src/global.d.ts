/// <reference types="jest-extended" />

import type { Jwt } from "./schema";

declare module "express-serve-static-core" {
  interface Request {
    idParam?: string | undefined;
    jwt?: Jwt | undefined;
    readonly logout: () => void;
    requestId: string;
    userRef?:
      | {
          readonly id: string;
          readonly type: "id";
        }
      | {
          readonly email: string;
          readonly type: "email";
        }
      | undefined;
  }
}

declare module "express-session" {
  interface SessionData {
    failureReturnUrl?: string | undefined;
    successReturnUrl?: string | undefined;
  }
}
