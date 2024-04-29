import { JWT_SECRET } from "../config";
import { expressjwt } from "express-jwt";

export const jwtAuth = expressjwt({
  algorithms: ["HS256"],
  requestProperty: "auth",
  secret: JWT_SECRET
});
