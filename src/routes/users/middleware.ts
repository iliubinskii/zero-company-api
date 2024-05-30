import type { UsersMiddleware } from "../../types";
import { assertDefined } from "../../utils";

export const usersMiddleware: UsersMiddleware = {
  userRefFromIdParam: (req, _res, next) => {
    const id = assertDefined(req.idParam);

    req.userRef = { id, type: "id" };
    next();
  },
  userRefFromJwt: (req, _res, next) => {
    const { email } = assertDefined(req.jwt);

    req.userRef = { email, type: "email" };
    next();
  }
};
