import type { paths } from "./routes";

export type Routes = RouteTransform<paths>;

export type RouteTransform<T> = {
  [K in keyof T]: undefined extends T[K]
    ? RouteTransform<T[K]> | null | undefined
    : RouteTransform<T[K]>;
};

export * from "./categories";
export * from "./categories.validation";
export * from "./common";
export * from "./companies";
export * from "./companies.validation";
export * from "./company-images";
export * from "./company-images.validation";
export * from "./consts";
export * from "./documents";
export * from "./documents.validation";
export * from "./get-all-options";
export * from "./get-all-options.validation";
export { default as schema } from "./schema.json";
export * from "./users";
export * from "./users.validation";
