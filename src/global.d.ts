/// <reference types="jest-extended" />

import { JwtUser } from "./schema";

declare module "express-serve-static-core" {
  interface Request {
    idParam?: string;
    jwtUser?: JwtUser;
    readonly logout: () => void;
    requestId: string;
    userEmail?: string;
  }
}
