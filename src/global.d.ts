/// <reference types="jest-extended" />

import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import type { Jwt } from "./schema";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "date-field": IntrinsicElement;
      "signature-field": IntrinsicElement;
      "text-field": IntrinsicElement;
    }
  }
}

declare module "@jest/expect" {
  export interface Matchers<R>
    // eslint-disable-next-line no-undef -- Ok
    extends CustomMatchers<R> {}
}

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

export type IntrinsicElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & { name: string; role: string; style?: CSSProperties };
