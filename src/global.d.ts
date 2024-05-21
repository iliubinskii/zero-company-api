/// <reference types="jest-extended" />

import type { Jwt } from "./schema";

declare module "express-serve-static-core" {
  interface Request {
    idParam?: string;
    jwt?: Jwt;
    readonly logout: () => void;
    requestId: string;
    userEmail?: string;
  }
}
