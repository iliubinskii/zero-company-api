export interface Jwt {
  readonly email: string;
}

export interface JwtUser {
  readonly admin: boolean;
  readonly email: string;
}
