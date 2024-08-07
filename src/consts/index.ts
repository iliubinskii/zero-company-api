/* eslint-disable i18n-text/no-en -- Ok */

export const AUTH_COOKIE_EXPIRATION_LIFETIME_MS = 86_400_000;

export const AUTH_COOKIE_LIFETIME_MS = 86_400_000;

export const AUTH_COOKIE_NAME = "auth_token";

export const AUTH_HEADER_NAME = "authorization";

export const AUTH_HEADER_PREFIX = "Bearer ";

export const AUTH0_SCOPE = "openid email profile";

export const DOCKER_PORT = 3000;

export const DOCUSEAL_ENDPOINT = {
  SUBMISSIONS: "https://api.docuseal.co/submissions",
  TEMPLATES_HTML: "https://api.docuseal.co/templates/html"
} as const;

export const JWT_EXPIRES_IN = "24h";

export const LOG_REQUEST_ID_LENGTH = 6;

export const MONGODB_CONNECT_TIMEOUT_MS = 10_000;

export const MONGODB_ERROR = {
  DUPLICATE_KEY: 11_000
} as const;

export const MONGODB_SESSIONS_COLLECTION = "sessions";

export const MONGODB_SESSIONS_TTL_SEC = 3600;

export const MONGODB_SOCKET_TIMEOUT_MS = 10_000;

export const TEST_DELAY_MS = 100;
