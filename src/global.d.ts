/// <reference types="jest-extended" />

import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import type { Jwt } from "./schema";

export type IntrinsicElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & { name: string; role: string; style?: CSSProperties };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "date-field": IntrinsicElement;
      "signature-field": IntrinsicElement;
      "text-field": IntrinsicElement;
    }
  }
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
