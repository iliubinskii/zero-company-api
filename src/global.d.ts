// eslint-disable-next-line misc/comment-spacing -- Ok
/// <reference types="jest-extended" />

import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import type { Jwt } from "./schema";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      readonly "date-field": IntrinsicElement;
      readonly "signature-field": IntrinsicElement;
      readonly "text-field": IntrinsicElement;
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
    // eslint-disable-next-line misc/typescript/prefer-readonly-property -- Ok
    idParam?: string | undefined;
    // eslint-disable-next-line misc/typescript/prefer-readonly-property -- Ok
    jwt?: Jwt | undefined;
    // eslint-disable-next-line misc/typescript/prefer-readonly-property -- Ok
    logout: () => void;
    // eslint-disable-next-line misc/typescript/prefer-readonly-property -- Ok
    requestId: string;
    // eslint-disable-next-line misc/typescript/prefer-readonly-property -- Ok
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
    // eslint-disable-next-line misc/typescript/prefer-readonly-property -- Ok
    failureReturnUrl?: string | undefined;
    // eslint-disable-next-line misc/typescript/prefer-readonly-property -- Ok
    successReturnUrl?: string | undefined;
  }
}

export type IntrinsicElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  readonly name: string;
  readonly role: string;
  readonly style?: CSSProperties;
};
